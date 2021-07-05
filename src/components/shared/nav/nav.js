import React from 'react';
import './nav.css'
import { Link , Redirect }  from 'react-router-dom';
import { connect } from 'react-redux';
import { useCallback, useEffect, useState } from "react";
import Web3Modal from 'web3modal';
import { Contract, providers } from 'ethers';
import { ERC20 } from '../../../ABIs/ERC20';
import { RadicalTokenExample } from '../../../ABIs/Radical';
import { RadicalManager } from '../../../ABIs/Radical';
import Modal from 'react-modal';
import util from 'util'
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../state';





//  const dataRadical = {
//    img: "",
//    name: '',
//    desc: '',
//    copiesNumber: '',
//    collection: '',
//    price: '',
//    patronage: ''
//  }

//  function Mint({ address, userProvider }) {
//     const writeContracts = useContractLoader(userProvider)
//     // const tx = Transactor(userProvider)
//     // const initialFormData = Object.freeze({
//     //   name: "Chimp",
//     //   description: "Chimp",
//     //   file: "https://images.squarespace-cdn.com/content/v1/575fa285e321408871d8ed19/1594709938301-QHU9O68TY77LR2F00FGV/ke17ZwdGBToddI8pDm48kE2GkdnIr5SO-CACT9XyGZlZw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVGVc7K5CECqctQZfnE8sPkLF_B0_4y0xtJXb2emPG5POEtYYWjJQ7oNp_jeQjbXLko/Chimp1_moncur_0.7mx1m.jpg?format=2500w",
//     //   patronageRate: "50",
//     //   newPrice: "0.25",
//     //   checked: false
//     // })
//     // const [formData, updateFormData] = useState(initialFormData);
  
  
//     // const handleChange = (e) => {
//     //   updateFormData({
//     //     ...formData,
  
//     //     [e.target.name]: e.target.value
  
//     //   });
//     // };
  
//     // const handleSubmit = async (e) => {
//     //   e.preventDefault()
//     //   console.log(formData);
//     //   await mintFromFormOutput(formData);
//     // };
  
  
//     const mintFromFormOutput = async (data) => {
//       const {
//         name,
//         description,
//         image,
//         artist,
//         patronageRate,
//         newPrice,
//       } = data;
  
//       const radicalToken = {
//         name,
//         description,
//         image,
//         attributes: [
//           {
//             trait_type: "artist",
//             value: artist
//           }
//         ]
//       };
  
//       const patronageToken = {
//         name: `${patronageRate}% patronage on ${name}`,
//         description: `Pay to the bearer on demand ${patronageRate}%`,
//         image,
//         attributes: [
//           {
//             trait_type: "Patronage Rate",
//             value: patronageRate
//           }
//         ]
//       };
  
//       console.log("Uploading radical ..")
//       console.log("Uploading patronage...")
//       const r = await ipfs.add(JSON.stringify(radicalToken))
//       const p = await ipfs.add(JSON.stringify(patronageToken))
//       console.log(r, p);
  
//       await tx(writeContracts.RadicalManager.mint(address, utils.parseEther(newPrice), parseInt(patronageRate), p.path, r.path))
//     }
//   }


function Nav (){

    const state = useSelector((state) => state);
    const dispatch = useDispatch()
    const {addProvider} =  bindActionCreators( actionCreators, dispatch)

    const web3Modal = new Web3Modal({
        cacheProvider: true, // optional
    });
    const [ethersProviderState, setEthersProviderState] = useState(null);

    const loadWeb3Modal = (async () => {

        const provider = await web3Modal.connect();
        const ethersProvider = new providers.Web3Provider(provider);
        // window.localStorage.setItem("ethersp", JSON.stringify(ethersProvider))
        window.localStorage.setItem('eth', ethersProvider.connection)
        const providerLocal = window.localStorage.getItem('eth')   
        // console.log(providerLocal.toString())
       if(providerLocal.toString()){
            setIsOpen(false);
            setIsConnected("hidden");
            alert("You are connected");

        }


        const contract = new Contract("0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", ERC20, ethersProvider)
        const radicalExample = new Contract("0x03737B8f994ba43093fB20929CB4c6403a9eEdD8", RadicalTokenExample, ethersProvider)
        const radicalManager = new Contract("0x48A3fa9cf12675C6cB108999332ca55ceEb01b48", RadicalManager, ethersProvider)

        const [ address ]  = await ethersProvider.listAccounts();
        const balance = await contract.functions.balanceOf("0x17bA00bf3792CAD107966806949731D4b1C656A8");
        const decimals = await contract.functions.decimals();
        console.log(parseFloat(balance)/10**parseInt(decimals));
        const symbol = await contract.functions.symbol();

    });

    useEffect(() =>{
      console.log("ethersProvides" + ethersProviderState)
    }, [ethersProviderState])
    

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [isConnected, setIsConnected] = React.useState(null);


    function connectWallet(){
        setIsOpen(true)
    }
    function connectMetamask(){
        setIsOpen(false);
    }

      const sss = window.localStorage.getItem('ethersp')
      console.log(sss)
    const connectModal = {
        content:{
            position: 'absolute',
            width: '600px',
            height: '517px',
            borderColor: '#f5f5f5',
            background: '#FFFFFF',
            borderRadius: '30px',
            margin: '0 auto',
            marginTop: '120px',
            align: 'center'
        }
    }
    return (
            <div className="row landing navigation">
                <div className="row">
                    <div className="col-md-4 col-lg-4">
                        <Link className="text-link" to="/">
                            <div>
                                <span>
                                    <svg width="132" height="23" viewBox="0 0 132 23" fill="none" xmlns="http://www.w3.org/2000/svg"> 
                                    <path d="M0.79258 0.999999V22H3.79258V13H10.5726L15.7926 22H19.2426C16.8726 17.8 15.0126 13.06 9.82258 11.89V11.8C10.8126 12.01 11.8026 12.13 12.8226 12.13C16.2726 12.13 18.5826 10.72 18.5826 7C18.5826 3.58 15.8526 0.999999 12.4626 0.999999H0.79258ZM12.4626 4C14.1726 4 15.5826 5.26 15.5826 7C15.5826 8.74 14.1726 10 12.4626 10H3.79258V4H12.4626ZM30.4797 0.999999L37.3797 22H40.5297L33.6297 0.999999H27.3297L20.4297 22H23.5797L30.4797 0.999999ZM42.6262 22H51.5062C57.3262 22 61.8262 17.47 61.8262 11.56C61.8262 5.65 57.3262 0.999999 51.5062 0.999999H42.6262V22ZM51.5362 4C55.7062 4 58.8262 7.3 58.8262 11.56C58.8262 15.85 55.7062 19 51.5362 19H45.6262V4H51.5362ZM64.9785 22H67.9785V0.999999H64.9785V22ZM82.0844 22.45C84.9044 22.45 87.6644 21.46 89.7344 19.48V13.75C88.7744 17.26 85.6844 19.45 82.0844 19.45C77.5544 19.45 74.1344 16.03 74.1344 11.5C74.1344 6.97 77.5544 3.55 82.0844 3.55C85.6844 3.55 88.7744 5.74 89.7344 9.25V3.52C87.6644 1.54 84.9044 0.549999 82.0844 0.549999C75.8444 0.549999 71.1344 5.26 71.1344 11.5C71.1344 17.74 75.8444 22.45 82.0844 22.45ZM101.579 0.999999L108.479 22H111.629L104.729 0.999999H98.4285L91.5285 22H94.6785L101.579 0.999999ZM113.725 0.999999V22H131.695V19H116.725V0.999999H113.725Z" fill="#282828"/>
                                    </svg>
                                </span>
                            </div>
                        </Link>
                    </div>
                    
                    <div className="col-md-4 col-lg-4 mid-content">
                    <Link className="text-link" to="/marketplace"><span className="nav-item">Marketplace</span></Link>
                    <a href="https://radical.gitbook.io/radical-nft/" className="text-link nav-item" >Documentation</a>
                    <a href="https://showcase.ethglobal.co/hackmoney2021/radical" className="text-link nav-item" >About</a>
                    </div>
                    <div className="col-md-4 col-lg-4 right-content">
                    <Link className="text-link" to="/search">
                    <span className="search nav-item">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="5.5" cy="5" r="4.5" stroke="#282828" stroke-linejoin="round"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2715 12.5L8 8.27523L8.72845 7.5L13 11.7248L12.2715 12.5Z" fill="#282828"/>
                    </svg>
                        Search
                    </span>
                    </Link>
                    <Link to="/mint"  className="text-link">
                    <span className="mint nav-item"> Mint</span>
                    </Link>
                    <button className="connect-wallet" onClick={connectWallet} isConnected> Connect Wallet</button>
                    <Link to="/profile" className="text-link">
                        <span className="profile" isConnected={isConnected}> U </span>
                    </Link>

                    </div>
                    <Modal 
                        isOpen={modalIsOpen}
                        style={connectModal}
                        >
                        <button onClick={() =>setIsOpen(false)} className="button-close">
                            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M21.8249 1.25384C22.327 1.73925 22.327 2.52624 21.8248 3.01165L13.0351 11.5077L21.8249 20.0037C22.327 20.4891 22.327 21.2761 21.8249 21.7615C21.3227 22.2469 20.5085 22.2469 20.0063 21.7615L11.2166 13.2655L2.42682 21.7615C1.92464 22.2469 1.11044 22.2469 0.608255 21.7615C0.106072 21.2761 0.106072 20.4891 0.608255 20.0037L9.39799 11.5077L0.608256 3.01165C0.106073 2.52624 0.106073 1.73925 0.608255 1.25384C1.11044 0.76844 1.92464 0.76844 2.42682 1.25384L11.2166 9.74989L20.0063 1.25384C20.5085 0.76844 21.3227 0.76844 21.8249 1.25384Z" fill="#1E1E1E" fill-opacity="0.75"/>
                            </svg>
                        </button>

                        <div className="connect-wallet-title">Connect your wallet</div>
                        <div className="connect-wallet-desc">By connecting your wallet, you agree to our Terms of Service and our Privacy Policy.</div>
                        <button className="connect-wallet-button" onClick={loadWeb3Modal}> Connect with Metamask</button><br></br>
                        <button className="connect-wallet-button2"  onClick={loadWeb3Modal} disabled> Connect with other wallet</button>


                    </Modal>

                    </div>
            </div>
    
     );
    
}

export default  Nav;
