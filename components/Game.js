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

const LOTTERY_STATE = ["Open to Play", "Calculating", "Open to Withdraw"]

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
  const [signer, setSigner] = useState(undefined)
  const [lotteryContract, setLotteryContract] = useState(undefined)
  const [lotteryTokenContract, setLotteryTokenContract] = useState(undefined)
  const [usdcContract, setUsdcContract] = useState(undefined)
  const [admin, setAdmin] = useState(undefined)
  const [isAdmin, setIsAdmin] = useState(false)
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
        setSigner(signer)
        setLotteryContract(lotteryContract)
        setLotteryTokenContract(lotteryTokenContract)
        setUsdcContract(usdcContract)
      }
      init()
    }
  }, [isWeb3Enabled, account])

  useEffect(() => {
    if (isWeb3Enabled && lotteryContract) {
      async function init() {
        await getLotteryConstants()
      }
      init()
    }
  }, [isWeb3Enabled, lotteryContract])

  useEffect(() => {
    if (
      isWeb3Enabled &&
      lotteryContract &&
      lotteryTokenContract &&
      usdcContract
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
  ])

  async function getLotteryConstants() {
    const admin = await getLotteryAdmin()
    const lotteryFee = await getLotteryFee()
    const ticketPrice = await getLotteryTicketPrice()
    const playTimeInterval = await getPlayTimeInterval()
    setAdmin(admin)
    setLotteryFee(lotteryFee)
    setTicketPrice(ticketPrice)
    setPlayTimeInterval(playTimeInterval)
  }

  async function upDateUI() {
    const lotteryState = await getLotteryState()
    const isFirstPlayer = await getIsFirstPlayer()
    const endPlayTime = await getEndPlayTime()
    const endWithDrawTime = await getEndWithDrawTime()
    const players = await getPlayers()
    const winners = await getWinners()
    if (provider) {
      const lotteryETHBalance = await provider.getBalance(lotteryAddress)
    }
    const lotteryUSDCBalanceOnLottery = await getLotteryUSDCBalanceOnLottery()
    const lotteryUSDCBalanceOnCompound = await getLotteryUSDCBalanceOnCompound()
    const lotteryLTKBalance = await getLotteryLTKBalance()
    const playerLTKBalance = await getPlayerLTKBalance()
    let playerLTKGivenAllowanceToLottery =
      await getPlayerLTKGivenAllowanceToLottery()
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

  // Lottery contract functions
  /// use Moralis function to use onSuccess Notifications
  const { runContractFunction: enterLottery } = useWeb3Contract({
    abi: lotteryAbi,
    contractAddress: lotteryAddress,
    functionName: "enterLottery",
    params: [],
    msgValue: lotteryFee,
  })

  async function getLotteryAdmin() {
    let admin = await lotteryContract.getAdmin()
    return admin
  }

  async function getLotteryFee() {
    const lotteryFee = await lotteryContract.getLotteryFee()
    return lotteryFee
  }

  async function getLotteryTicketPrice() {
    const ticketPrice = await lotteryContract.getLotteryTicketPrice()
    return ticketPrice
  }

  async function getLotteryState() {
    if (lotteryContract) {
      const lotteryState = await lotteryContract.getLotteryState()
      return lotteryState
    }
  }

  async function getIsFirstPlayer() {
    if (lotteryContract) {
      const isFirstPlayer = await lotteryContract.getIsFirstPlayer()
      return isFirstPlayer
    }
  }

  async function getPlayers() {
    if (lotteryContract) {
      let players = await lotteryContract.getPlayers()
      return players
    }
  }

  async function getWinners() {
    if (lotteryContract) {
      let winners = await lotteryContract.getWinners()
      return winners
    }
  }

  async function getPlayTimeInterval() {
    if (lotteryContract) {
      let playTimeInterval = await lotteryContract.getInterval()
      return playTimeInterval
    }
  }

  async function getEndPlayTime() {
    if (lotteryContract) {
      let endPlayTime = await lotteryContract.getEndPlayTime()
      return endPlayTime
    }
  }

  async function getEndWithDrawTime() {
    if (lotteryContract) {
      let endWithDrawTime = await lotteryContract.getEndWithDrawTime()
      return endWithDrawTime
    }
  }

  async function getLotteryUSDCBalanceOnLottery() {
    if (lotteryContract) {
      let lotteryUSDCBalance = await lotteryContract.getLotteryUSDCBalance()
      return lotteryUSDCBalance
    }
  }

  async function getLotteryUSDCBalanceOnCompound() {
    if (lotteryContract) {
      let lotteryUSDCBalanceOnCompound =
        await lotteryContract.getLotteryUSDCBalanceOnCompound()
      return lotteryUSDCBalanceOnCompound
    }
  }

  async function withdrawFromLottery() {
    if (lotteryContract) {
      let trx = await lotteryContract.withdrawFromLottery({ gasLimit: 1000000 })
      await trx.wait(1)
    }
  }

  // Lottery Token contract functions
  async function getLotteryLTKBalance() {
    if (lotteryTokenContract) {
      const lotteryLTKBalance = await lotteryTokenContract.balanceOf(
        lotteryAddress
      )
      return lotteryLTKBalance
    }
  }

  async function getPlayerLTKBalance() {
    if (lotteryTokenContract) {
      const playerLTKBalance = await lotteryTokenContract.balanceOf(account)
      return playerLTKBalance
    }
  }

  async function playerIncreaseLTKAllowanceToLottery() {
    if (lotteryTokenContract) {
      let trx = await lotteryTokenContract.increaseAllowance(
        lotteryAddress,
        ethers.utils.parseEther("1"), // 1 LTK
        {
          gasLimit: 1000000,
        }
      )
      await trx.wait(1)
    }
  }

  async function getPlayerLTKGivenAllowanceToLottery() {
    if (lotteryTokenContract) {
      const data = await lotteryTokenContract.allowance(account, lotteryAddress)
      return data
    }
  }

  // USDC contract functions
  async function playerTransferUSDCToLottery() {
    if (usdcContract) {
      let trx = await usdcContract.transfer(lotteryAddress, ticketPrice, {
        gasLimit: 1000000,
      })
      await trx.wait(1)
    }
  }

  // helpers
  async function handleEnterLottery() {
    if (isWeb3Enabled) {
      if (lotteryState != "Open to Play") {
        alert(
          `Next Lottery runs on ${new Date(
            parseInt(endWithDrawTime) * 1000
          ).toLocaleString()}`
        )
      } else {
        // 1. user calls USDC .transfer() => USDC to lottery contract
        try {
          await setProgressBar(25)
          await playerTransferUSDCToLottery()
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
          await playerIncreaseLTKAllowanceToLottery()
          console.log("Player entered Lottery")
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
      if (lotteryState != "Open to Withdraw") {
        alert("Please wait until Lottery is open to Withdraw")
      } else {
        const playerNumLTK = await getPlayerLTKBalance()
        if (parseInt(playerNumLTK) == 0) {
          alert("Player without LTK can not withdraw USDC")
        } else {
          console.log(`Player ${account} is withdrawing...`)
          // Player calls Lottery .withdrawFromLottery()
          await withdrawFromLottery()
          console.log("Player has withdrawn")
          await upDateUI()
        }
      }
    }
  }

  // helpers for ADMIN
  // if (account && admin && account.toLowerCase() == admin.toLowerCase()) {
  //   setIsAdmin(true)
  // }

  async function handleAdminFundLotteryAndApproveAndSupplyCompound() {
    if (isWeb3Enabled && isAdmin && usdcContract && lotteryContract) {
      const amountUSDCToFund = ethers.utils.parseUnits("10", 6)
      // 1. Admin calls USDC .transfer() => USDC to Lottery
      let trx = await usdcContract.transfer(lotteryAddress, amountUSDCToFund, {
        gasLimit: 1000000,
      })
      await trx.wait(1)
      console.log(`Admin funded Lottery with ${amountUSDCToFund} USDC`)
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
    if (isWeb3Enabled && isAdmin && lotteryContract) {
      console.log(`Admin withdrawing ETH...`)
      let trx = await lotteryContract.adminWithdrawETH({
        gasLimit: 100000,
      })
      await trx.wait(1)
      console.log("Admin withdrawing ETH...DONE")
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
    console.log("handleGetStarted")
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

  const adminLowerCase = admin ? admin.toLowerCase() : null

  return (
    <div className='container mx-auto'>
      <HeadLine playerLTKBalance={playerLTKBalance} />
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
        {lotteryState && lotteryState == "Open to Withdraw" && (
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
          <GetStarted />
        </div>
      </div>
    </div>
  )
}
