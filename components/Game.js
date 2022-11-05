import styles from "../styles/Home.module.css"
import { useState, useEffect, useRef } from "react"
import { ethers } from "ethers"

import HeadLine from "../components/HeadLine"
import EnterLottery from "./EnterLottery"
import HowItWorks from "./HowItWorks"
import CurrentPlayers from "./CurrentPlayers"
import Winners from "./Winners"
import UserWithDraw from "./UserWithDraw"
import Admin from "./Admin"
import GetStarted from "./GetStarted"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useNotification } from "web3uikit"
import { lotteryAbi, lotteryAddresses } from "../constants/lottery/index.js"
import {
  lotteryTokenAbi,
  lotteryTokenAddresses,
} from "../constants/lotteryToken/index.js"
import { usdcAbi, usdcAddresses } from "../constants/usdc/index.js"

const LOTTERY_STATE = ["OPEN_TO_PLAY", "CALCULATING", "OPEN_TO_WITHDRAW"]

export default function Game() {
  const ref = useRef()
  const dispatch = useNotification()
  const { chainId: chainIdHex, isWeb3Enabled, account } = useMoralis()
  const chainId = parseInt(chainIdHex)

  //* contracts address */
  const lotteryAddress =
    chainId in lotteryAddresses ? lotteryAddresses[chainId][0] : null
  const lotteryTokenAddress =
    chainId in lotteryTokenAddresses ? lotteryTokenAddresses[chainId][0] : null
  const usdcAddress =
    chainId in usdcAddresses ? usdcAddresses[chainId][0] : null

  //* variables */
  const [provider, setProvider] = useState(undefined)
  const [lotteryContract, setLotteryContract] = useState(undefined)
  const [lotteryTokenContract, setLotteryTokenContract] = useState(undefined)
  const [usdcContract, setUsdcContract] = useState(undefined)
  const [admin, setAdmin] = useState(undefined)
  const [newWinner, setNewWinner] = useState(undefined)
  const [newWinPrize, setNewWinPrize] = useState(undefined)
  const [newWinDate, setNewWinDate] = useState(undefined)
  const [lotteryFee, setLotteryFee] = useState(undefined)
  const [ticketPrice, setTicketPrice] = useState(undefined)
  const [lotteryState, setLotteryState] = useState(undefined)
  const [endPlayTime, setEndPlayTime] = useState(false)
  const [endWithDrawTime, setEndWithDrawTime] = useState(false)
  const [playTimeInterval, setPlayTimeInterval] = useState(false)
  const [isFirstPlayer, setIsFirstPlayer] = useState(undefined)
  const [players, setPlayers] = useState(undefined)
  const [winners, setWinners] = useState(undefined)
  const [lotteryETHBalance, setLotteryETHBalance] = useState(undefined)
  const [lotteryUSDCBalanceOnLottery, setLotteryUSDCBalanceOnLottery] =
    useState(undefined)
  const [lotteryUSDCBalanceOnCompound, setLotteryUSDCBalanceOnCompound] =
    useState(undefined)
  const [lotteryLTKBalance, setLotteryLTKBalance] = useState(undefined)
  const [playerLTKBalance, setPlayerLTKBalance] = useState(undefined)
  const [
    playerLTKGivenAllowanceToLottery,
    setPlayerLTKGivenAllowanceToLottery,
  ] = useState(undefined)
  const [progress, setProgress] = useState(undefined)

  //* functions */
  // get Contracts with Signer
  useEffect(() => {
    if (isWeb3Enabled && account) {
      async function init() {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const lotteryContract = new ethers.Contract(
          lotteryAddress,
          lotteryAbi,
          signer
        )
        const lotteryTokenContract = new ethers.Contract(
          lotteryTokenAddress,
          lotteryTokenAbi,
          signer
        )
        const usdcContract = new ethers.Contract(usdcAddress, usdcAbi, signer)
        setProvider(provider)
        setLotteryContract(lotteryContract)
        setLotteryTokenContract(lotteryTokenContract)
        setUsdcContract(usdcContract)
      }
      init()
    }
  }, [isWeb3Enabled, account, lotteryAddress, lotteryTokenAddress, usdcAddress])

  // get Lottery constant variables
  useEffect(() => {
    if (isWeb3Enabled && lotteryContract) {
      async function init() {
        await getLotteryConstants()
      }
      init()
    }
  }, [isWeb3Enabled, lotteryContract])

  // get Lottery variables
  useEffect(() => {
    if (
      isWeb3Enabled &&
      lotteryContract &&
      lotteryTokenContract &&
      usdcContract &&
      provider
    ) {
      async function init() {
        await upDateUI()
      }
      init()
    }
  }, [
    isWeb3Enabled,
    account,
    lotteryContract,
    lotteryTokenContract,
    usdcContract,
    provider,
  ])

  async function getLotteryConstants() {
    if (lotteryContract) {
      const admin = await lotteryContract.getAdmin()
      const lotteryFee = await lotteryContract.getLotteryFee()
      const ticketPrice = await lotteryContract.getLotteryTicketPrice()
      const playTimeInterval = await lotteryContract.getInterval()
      setAdmin(admin)
      setLotteryFee(lotteryFee)
      setTicketPrice(ticketPrice)
      setPlayTimeInterval(playTimeInterval)
    }
  }

  async function upDateUI() {
    if (lotteryContract && lotteryTokenContract && provider) {
      const lotteryState = await lotteryContract.getLotteryState()
      const isFirstPlayer = await lotteryContract.getIsFirstPlayer()
      const endPlayTime = await lotteryContract.getEndPlayTime()
      const endWithDrawTime = await lotteryContract.getEndWithDrawTime()
      const players = await lotteryContract.getPlayers()
      const winners = await lotteryContract.getWinners()
      const lotteryETHBalance = await provider.getBalance(lotteryAddress)
      const lotteryUSDCBalanceOnLottery =
        await lotteryContract.getLotteryUSDCBalance()
      const lotteryUSDCBalanceOnCompound =
        await lotteryContract.getLotteryUSDCBalanceOnCompound()
      const lotteryLTKBalance = await lotteryTokenContract.balanceOf(
        lotteryAddress
      )
      const playerLTKBalance = await lotteryTokenContract.balanceOf(account)
      let playerLTKGivenAllowanceToLottery =
        await lotteryTokenContract.allowance(account, lotteryAddress)
      setLotteryState(LOTTERY_STATE[parseInt(lotteryState)])
      setIsFirstPlayer(isFirstPlayer)
      setEndPlayTime(endPlayTime)
      setEndWithDrawTime(endWithDrawTime)
      setPlayers(players)
      setWinners(winners)
      setLotteryETHBalance(lotteryETHBalance)
      setLotteryUSDCBalanceOnLottery(lotteryUSDCBalanceOnLottery)
      setLotteryUSDCBalanceOnCompound(lotteryUSDCBalanceOnCompound)
      setLotteryLTKBalance(lotteryLTKBalance)
      setPlayerLTKBalance(playerLTKBalance)
      setPlayerLTKGivenAllowanceToLottery(playerLTKGivenAllowanceToLottery)
    }
  }

  // Lottery contract function using Moralis
  const { runContractFunction: enterLottery } = useWeb3Contract({
    abi: lotteryAbi,
    contractAddress: lotteryAddress,
    functionName: "enterLottery",
    params: [],
    msgValue: lotteryFee,
  })

  // helpers
  const adminLowerCase = admin ? admin.toLowerCase() : null

  async function handleEnterLottery() {
    if (isWeb3Enabled) {
      if (lotteryState != "OPEN_TO_PLAY") {
        alert(
          `Next Lottery runs on ${new Date(
            parseInt(endWithDrawTime) * 1000
          ).toLocaleString()}`
        )
      } else {
        // 1. user calls USDC .transfer() => USDC to lottery contract
        try {
          await setProgressBar(25)
          let trx = await usdcContract.transfer(lotteryAddress, ticketPrice, {
            gasLimit: 1000000,
          })
          await trx.wait(1)
          console.log("trx", trx)
        } catch (error) {
          setProgressBar(undefined)
          console.log("error", error)
        }
        // 2. user calls Lottery .enterLottery()
        try {
          await setProgressBar(50)
          await enterLottery({
            onSuccess: handleSucess,
            onError: (error) => {
              console.log(error)
            },
          })
        } catch (error) {
          setProgressBar(undefined)
          console.log("error", error)
        }

        // 3. user calls LTK .increaseAllowance() => Gives LTKAllowance To Lottery
        try {
          await setProgressBar(75)
          let trx = await lotteryTokenContract.increaseAllowance(
            lotteryAddress,
            ethers.utils.parseEther("1"), // 1 LTK
            {
              gasLimit: 1000000,
            }
          )
          await trx.wait(1)
          await setProgressBar(100)
          await upDateUI()
          setProgressBar(undefined)
        } catch (error) {
          setProgressBar(undefined)
          console.log("error", error)
        }
      }
    }
  }

  async function handlePlayerWithdraw() {
    if (isWeb3Enabled) {
      if (lotteryState != "OPEN_TO_WITHDRAW") {
        alert("Please wait until Lottery is OPEN_TO_WITHDRAW")
      } else {
        const playerNumLTK = await lotteryTokenContract.balanceOf(account)
        if (parseInt(playerNumLTK) == 0) {
          alert("Player without LTK can not withdraw USDC")
        } else {
          console.log(`Player ${account} is withdrawing...`)
          // Player calls Lottery .withdrawFromLottery()
          let trx = await lotteryContract.withdrawFromLottery({
            gasLimit: 1000000,
          })
          await trx.wait(1)
          console.log("Player has withdrawn")
          await upDateUI()
        }
      }
    }
  }

  async function handleAdminFundLotteryAndApproveAndSupplyCompound() {
    if (
      isWeb3Enabled &&
      account == adminLowerCase &&
      usdcContract &&
      lotteryContract
    ) {
      const amountUSDCToFund = ethers.utils.parseUnits("10", 6)
      // 1. Admin calls USDC .transfer() => USDC to Lottery
      let trx = await usdcContract.transfer(lotteryAddress, amountUSDCToFund, {
        gasLimit: 1000000,
      })
      await trx.wait(1)
      // 2. Admin calls Lottery => Approve And Supply Compound
      trx = await lotteryContract.adminApproveAndSupplyCompound({
        gasLimit: 1000000,
      })
      await trx.wait(1)
      // Admin calls lottery contract .approveCompound() => USDC to Compound
      await upDateUI()
    }
  }

  async function handleAdminWithdrawETH() {
    if (isWeb3Enabled && account == adminLowerCase && lotteryContract) {
      let trx = await lotteryContract.adminWithdrawETH({
        gasLimit: 100000,
      })
      await trx.wait(1)
      await upDateUI()
    }
  }

  // helper for Notifications
  async function setProgressBar(value) {
    setProgress(value)
  }

  async function handleSucess(tx) {
    await tx.wait(2)
    handleNewNotification("Tx Notification", "Transaction complete")
    upDateUI()
  }

  async function handleNewNotification(title, message) {
    dispatch({
      type: "Info",
      title: title,
      message: message,
      position: "topR",
      icon: "bell",
    })
  }

  // helper for GetStarted
  const handleGetStarted = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }

  //* Events */
  if (isWeb3Enabled && lotteryAddress && lotteryAbi) {
    const webSocket =
      chainId == 5 ? process.env.NEXT_PUBLIC_GOERLI_WEB_SOCKET : null
    if (webSocket) {
      const webSocketProvider = new ethers.providers.WebSocketProvider(
        webSocket
      )
      const lotteryWithWebSocket = new ethers.Contract(
        lotteryAddress,
        lotteryAbi,
        webSocketProvider
      )

      lotteryWithWebSocket.on(
        "WinnerPicked",
        async (s_newWinner, s_newPrize, winDate, event) => {
          await upDateUI()
          let info = {
            newWinner: s_newWinner,
            newWinPrize: s_newPrize,
            newWinDate: winDate,
            data: event,
          }
          const { newWinner, newWinPrize, newWinDate } = info
          setNewWinner(newWinner)
          setNewWinPrize(ethers.utils.formatUnits(newWinPrize, 6))
          setNewWinDate(new Date(parseInt(newWinDate) * 1000).toLocaleString())

          // TODO : add notificationss
          // console.log(JSON.stringify(info, null, 2))
        }
      )
      lotteryWithWebSocket.on("CompoundWithdrawDone", async (event) => {
        await upDateUI()
        // TODO : add notificationss
      })
    }
  }

  {
    endPlayTime &&
      console.log(
        "endPlayTime",
        new Date(parseInt(endPlayTime) * 1000).toLocaleString()
      )
  }
  {
    endWithDrawTime &&
      console.log(
        "endWithDrawTime",
        new Date(parseInt(endWithDrawTime) * 1000).toLocaleString()
      )
  }

  return (
    <div className='container mx-auto'>
      <HeadLine
        playerLTKBalance={playerLTKBalance}
        lotteryUSDCBalanceOnLottery={lotteryUSDCBalanceOnLottery}
        lotteryUSDCBalanceOnCompound={lotteryUSDCBalanceOnCompound}
      />
      <div className='flex flex-col justify-center lg:flex-row'>
        <EnterLottery
          lotteryAddress={lotteryAddress}
          lotteryState={lotteryState}
          endPlayTime={endPlayTime}
          isFirstPlayer={isFirstPlayer}
          progress={progress}
          handleEnterLottery={handleEnterLottery}
        />
        <HowItWorks
          lotteryFee={lotteryFee}
          ticketPrice={ticketPrice}
          handleGetStarted={handleGetStarted}
        />
      </div>
      <div className='flex flex-col lg:flex-row justify-center'>
        <CurrentPlayers
          lotteryAddress={lotteryAddress}
          players={players}
          progress={progress}
          handleEnterLottery={handleEnterLottery}
        />
        <Winners
          winners={winners}
          newWinner={newWinner}
          newWinPrize={newWinPrize}
          newWinDate={newWinDate}
        />
      </div>
      <div className='flex flex-col lg:flex-row justify-center'>
        {lotteryState && lotteryState == "OPEN_TO_WITHDRAW" && (
          <UserWithDraw
            lotteryAddress={lotteryAddress}
            lotteryState={lotteryState}
            endWithDrawTime={endWithDrawTime}
            handlePlayerWithdraw={handlePlayerWithdraw}
          />
        )}
      </div>
      <div className='flex flex-col lg:flex-row justify-center'>
        {account && adminLowerCase && account == adminLowerCase && (
          <Admin
            admin={admin}
            lotteryAddress={lotteryAddress}
            lotteryTokenAddress={lotteryTokenAddress}
            usdcAddress={usdcAddress}
            lotteryETHBalance={lotteryETHBalance}
            lotteryUSDCBalanceOnLottery={lotteryUSDCBalanceOnLottery}
            lotteryUSDCBalanceOnCompound={lotteryUSDCBalanceOnCompound}
            handleAdminFundLotteryAndApproveAndSupplyCompound={
              handleAdminFundLotteryAndApproveAndSupplyCompound
            }
            handleAdminWithdrawETH={handleAdminWithdrawETH}
          />
        )}
      </div>
      <div className='flex flex-col lg:flex-row justify-center'>
        <div ref={ref}>
          <GetStarted
            lotteryTokenAddress={lotteryTokenAddress}
            usdcAddress={usdcAddress}
          />
        </div>
      </div>
    </div>
  )
}
