import { useState, useEffect, useRef } from "react"
import { ethers } from "ethers"

import HeadLine from "../components/HeadLine"
import EnterLottery from "./EnterLottery"
import HowItWorks from "./HowItWorks"
import CurrentPlayers from "./CurrentPlayers"
import Winners from "./Winners"
import UserWithDraw from "./UserWithDraw"
import Admin from "./Admin"
// import GetStarted from "./GetStarted"
import EtherScanLinks from "./EtherScanLinks"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useNotification } from "web3uikit"
import { lotteryAbi, lotteryAddresses } from "../constants/lottery/index.js"
import {
  lotteryTokenAbi,
  lotteryTokenAddresses,
} from "../constants/lotteryToken/index.js"
import { usdcAbi, usdcAddresses } from "../constants/usdc/index.js"

const LOTTERY_STATE = [
  "OPEN_TO_PLAY",
  "CALCULATING_WINNER_ADDRESS",
  "CALCULATING_WINNER_GAINS",
  "OPEN_TO_WITHDRAW",
]

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
  const [lotteryFee, setLotteryFee] = useState(undefined)
  const [ticketPrice, setTicketPrice] = useState(undefined)
  const [lotteryState, setLotteryState] = useState(undefined)
  const [endPlayTime, setEndPlayTime] = useState(false)
  const [endWithDrawTime, setEndWithDrawTime] = useState(false)
  const [isFirstPlayer, setIsFirstPlayer] = useState(undefined)
  const [players, setPlayers] = useState(undefined)
  const [winners, setWinners] = useState(undefined)
  const [newWinner, setNewWinner] = useState(undefined)
  const [newWinPrize, setNewWinPrize] = useState(undefined)
  const [newWinDate, setNewWinDate] = useState(undefined)
  const [lotteryETHBalance, setLotteryETHBalance] = useState(undefined)
  const [lotteryUSDCBalanceOnLottery, setLotteryUSDCBalanceOnLottery] =
    useState(undefined)
  const [lotteryUSDCBalanceOnCompound, setLotteryUSDCBalanceOnCompound] =
    useState(undefined)
  const [playerLTKBalance, setPlayerLTKBalance] = useState(undefined)
  const [playerUSDCBalance, setPlayerUSDCBalance] = useState(undefined)
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
      setAdmin(admin)
      setLotteryFee(lotteryFee)
      setTicketPrice(ticketPrice)
    }
  }

  async function upDateUI() {
    if (lotteryContract && lotteryTokenContract && provider) {
      const lotteryState = await lotteryContract.getLotteryState()
      const endPlayTime = await lotteryContract.getEndPlayTime()
      const endWithDrawTime = await lotteryContract.getEndWithDrawTime()
      const isFirstPlayer = await lotteryContract.getIsFirstPlayer()
      const players = await lotteryContract.getPlayers()
      const winners = await lotteryContract.getWinners()
      const lotteryETHBalance = await provider.getBalance(lotteryAddress)
      const lotteryUSDCBalanceOnLottery =
        await lotteryContract.getLotteryUSDCBalance()
      const lotteryUSDCBalanceOnCompound =
        await lotteryContract.getLotteryUSDCBalanceOnCompound()
      const playerLTKBalance = await lotteryContract.getPlayerNumberOfTickets(
        account
      )
      const playerUSDCBalance = await usdcContract.balanceOf(account)
      setLotteryState(LOTTERY_STATE[parseInt(lotteryState)])
      setEndPlayTime(endPlayTime)
      setEndWithDrawTime(endWithDrawTime)
      setIsFirstPlayer(isFirstPlayer)
      setPlayers(players)
      setWinners(winners)
      setLotteryETHBalance(lotteryETHBalance)
      setLotteryUSDCBalanceOnLottery(lotteryUSDCBalanceOnLottery)
      setLotteryUSDCBalanceOnCompound(lotteryUSDCBalanceOnCompound)
      setPlayerLTKBalance(playerLTKBalance)
      setPlayerUSDCBalance(playerUSDCBalance)
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
  async function handleEnterLottery() {
    if (isWeb3Enabled && playerUSDCBalance) {
      if (playerUSDCBalance.toNumber() < ticketPrice.toNumber()) {
        alert("You need more USDC to enter the lottery")
        return
      }
      if (lotteryState != "OPEN_TO_PLAY") {
        alert(
          `Please wait for next Lottery run: ${new Date(
            parseInt(endWithDrawTime) * 1000
          ).toLocaleString()}`
        )
        return
      } else if (
        lotteryContract &&
        lotteryTokenContract &&
        usdcContract &&
        lotteryAddress &&
        lotteryFee &&
        ticketPrice
      ) {
        // 1. User calls USDC contract => USDC to Lottery
        try {
          await setProgressBar(25)
          let trx = await usdcContract.transfer(lotteryAddress, ticketPrice, {
            gasLimit: 1000000,
          })
          await trx.wait(1)
        } catch (error) {
          setProgressBar(undefined)
          console.log("error", error)
        }
        // 2. User calls Lottery contract => lotteryFee to Lottery
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

        // 3. User calls LTK contract => increase LTK Allowance To Lottery
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
    if (isWeb3Enabled && lotteryTokenContract) {
      if (lotteryState != "OPEN_TO_WITHDRAW") {
        alert("Please wait until Lottery is Open to Withdraw")
      } else {
        const playerNumLTK = await lotteryTokenContract.balanceOf(account)
        if (parseInt(playerNumLTK) == 0) {
          alert("You have no USDC to withdraw")
        } else {
          // Player calls Lottery contract => withdraw USDC
          let trx = await lotteryContract.withdrawFromLottery({
            gasLimit: 1000000,
          })
          await trx.wait(1)
          await upDateUI()
        }
      }
    }
  }

  const adminLowerCase = admin ? admin.toLowerCase() : null
  async function handleAdminFundLotteryAndApproveAndSupplyCompound() {
    if (account && adminLowerCase && account != adminLowerCase) {
      alert("Access reserved to admin")
    } else if (isWeb3Enabled && usdcContract && lotteryContract) {
      const amountUSDCToFund = ethers.utils.parseUnits("10", 6)
      // 1. Admin calls USDC contract => USDC to Lottery
      let trx = await usdcContract.transfer(lotteryAddress, amountUSDCToFund, {
        gasLimit: 1000000,
      })
      await trx.wait(1)
      // 2. Admin calls Lottery contract => Approve And Supply Compound with all USDC available in Lottery
      trx = await lotteryContract.adminApproveAndSupplyCompound({
        gasLimit: 1000000,
      })
      await trx.wait(1)
      await upDateUI()
    }
  }

  async function handleAdminWithdrawETH() {
    if (account && adminLowerCase && account != adminLowerCase) {
      alert("Access reserved to admin")
    } else if (isWeb3Enabled && account == adminLowerCase && lotteryContract) {
      // Admin calls Lottery contract => withdraw ETH
      let trx = await lotteryContract.adminWithdrawETH({
        gasLimit: 100000,
      })
      await trx.wait(1)
      await upDateUI()
    }
  }

  async function onAdminMint(_amount) {
    if (account && adminLowerCase && account != adminLowerCase) {
      alert("Access reserved to admin")
    } else if (
      isWeb3Enabled &&
      account == adminLowerCase &&
      lotteryAddress &&
      lotteryTokenContract
    ) {
      // Admin calls LTK contract => Mint LTK
      const amount = ethers.utils.parseEther(_amount)
      let trx = await lotteryTokenContract.mint(lotteryAddress, amount, {
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
    await tx.wait(1)
    // handleNewNotification("Tx Notification", "Transaction complete")
    await upDateUI()
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

      // TODO: add notifications
      lotteryWithWebSocket
        .on("LotteryEntered", async (event) => {
          await upDateUI()
        })
        .on("SwitchToCalculatingWinnerGains", async (event) => {
          await upDateUI()
        })
        .on("WinnerPicked", async (s_newWinner, s_newPrize, winDate, event) => {
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
        })
        .on("UserWithdraw", async (event) => {
          await upDateUI()
        })
        .on("SwitchToOpenToPlay ", async (event) => {
          await upDateUI()
        })
    }
  }

  console.log("lotteryState", lotteryState)

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
        {players && players.length > 0 && (
          <CurrentPlayers
            lotteryAddress={lotteryAddress}
            players={players}
            progress={progress}
            handleEnterLottery={handleEnterLottery}
          />
        )}
        {winners && winners.length > 0 && (
          <Winners
            winners={winners}
            newWinner={newWinner}
            newWinPrize={newWinPrize}
            newWinDate={newWinDate}
          />
        )}
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
        {account && admin && (
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
            onAdminMint={onAdminMint}
          />
        )}
      </div>
      <div className='flex flex-col lg:flex-row justify-center'>
        <div ref={ref}>
          <EtherScanLinks
            lotteryAddress={lotteryAddress}
            lotteryTokenAddress={lotteryTokenAddress}
            usdcAddress={usdcAddress}
          />
        </div>
      </div>
    </div>
  )
}
