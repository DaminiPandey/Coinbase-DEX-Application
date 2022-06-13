import Header from '../components/Header'
import styled from 'styled-components'
import Main from '../components/Main'
import Sidebar from '../components/Sidebar'
import { ThirdwebSDK } from '@3rdweb/sdk'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'

const Dashboard = ({ address }) => {
  const [twTokens, setTwTokens] = useState([])
  const [sanityTokens, setSanityTokens] = useState([])

  useEffect(() => {
    const getCoins = async () => {
      try {
        const coins = await fetch(
          "https://1qdyjcg9.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%3D%3D'coins'%5D%7B%0A%20%20name%2C%0A%20%20usdPrice%2C%0A%20%20contractAddress%2C%0A%20%20symbol%2C%0A%20%20logo%2C%0A%7D",
        )
        const tempSanityTokens = await coins.json()

        setSanityTokens(tempSanityTokens.result)
      } catch (error) {
        console.error(error)
      }
    }

     getCoins()
  }, [])

  useEffect(() => {
    if (sanityTokens) {
      const sdk = new ThirdwebSDK(
        new ethers.Wallet(
          "dec4f705b011e69d368160b445f98a18ce8406bdbad5ddc266db58fd8263f88d",
          ethers.getDefaultProvider('https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'),
        ),
      )

      sanityTokens.map(tokenItem => {
        const currentToken = sdk.getTokenModule(tokenItem.contractAddress)

        setTwTokens(prevState => [...prevState, currentToken])
      })
    }
  }, [sanityTokens])

  return (
    <Wrapper>
      <Sidebar />
      <MainContainer>
        <Header
          twTokens={twTokens}
          sanityTokens={sanityTokens}
          walletAddress={address}
        />
        <Main
          twTokens={twTokens}
          sanityTokens={sanityTokens}
          walletAddress={address}
        />
      </MainContainer>
    </Wrapper>
  )
}

export default Dashboard

export async function getServerSideProps(context) {}

const Wrapper = styled.div`
display: flex;
height: 100vh;
width: 100vw;
background-color: #0a0b0d;
color: white;
overflow: hidden;
overflow-y: scroll;
::-webkit-scrollbar{
  display: none;
}
`
const MainContainer=styled.div`
flex: 1;
`