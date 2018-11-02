import "../style/tutorial.less"
import dapp from "../../dapp.logic.js"
import manifest from "../../dapp.manifest.js"
import template from "./tutorials_template.js"
import DCWebapi from "dc-webapi"

// import JSjquery from "../sys/jquery.min.js"
// import JSmain from "../sys/main.js"
// import JSprefixfree from "../sys/prefixfree.min.js"
import "../sys/reset.min.css"
import "../sys/roll.css"
import "../sys/main.css"

const playerPrivateKeys = {
	ropsten: "0xf67dfe6039ee029ae771d7e2da5a4324532ecc62cb59a292efc9cf49fd1b549e",
	rinkeby: "0x3F8B1B2FC40E744DA0D5D748654E19C5018CC2D43E1FD3EF9FD89E6F7FC652A0",
	local: "0x20dbac4b6dc2f8a663b966ccb3e1dcad7f1d74a277e6b6d3fb7761da06c3ce93"
}

console.log(manifest)
const WALLET_PWD = "1234"
const DC_ID_PLATFORM = process.env.MACHINE_NAME || "DC_local"

console.log(process.env.MACHINE_NAME)
export default new class View {

	async initDao(inputedPrivKey, platformId = DC_ID_PLATFORM, blockchainNetwork = 'local') {
		try {
			const webapi = await new DCWebapi({
				platformId,
				blockchainNetwork
			}).start()

			window.webapi = webapi
			window.webapi.account.init(WALLET_PWD, inputedPrivKey)
			window.localStorage.last_privkey = inputedPrivKey
			
			window.game = window.webapi.createGame({
				name: manifest.slug,
				contract: manifest.getContract('local'),
				gameLogicFunction: dapp,
				rules: manifest.rules
			})

			this.DC_NETWORK = blockchainNetwork

			// this.showStep3()
		} catch (e) {
			console.log(e)
			return
		}
	}

	async disconnect() {
		await window.game.disconnect()
	}

	init() {
		localStorage.clear()
		const that = this
		document.getElementById("tutorial_mount_point").innerHTML = template
		this.root = document.getElementById("tutorial_app")
		
		document.getElementById("step-4").style.display = "none";
		document.getElementById("gamedice").onclick = async () => {
			console.log('on click')
			await this.initDao(playerPrivateKeys['local'])
			await window.game.start()
			await window.game.connect({
				playerDeposit: 10,
				gameData: [0, 0]
			})
			this.toggleGameView();
		}

		document.getElementById("play").onclick = async () => await this.playRound()
		
		//this.showStep3()
	}

	toggleGameView() {
		document.getElementById("step-3").style.display = "none";
		document.getElementById("step-4").style.display = "block";
	}

	setSpinnerStatus(status) {
		document.getElementById("loader-spinner").style.display = status
	}

	// showStep3() {
	// 	this.showStep(3)

	// 	const btn = this.root.querySelector(".step-3 button")
	// 	btn.onclick = async () => {
	// 		this.setSpinnerStatus("block")
	// 		document.getElementById('h1').innerHTML = "Dice";
	// 		btn.disabled = true
	// 		const deposit = this.root.querySelector('.step-3 input[name="deposit"]')
	// 			.value
	// 		try {
	// 		} catch (e) {
	// 			console.error(e)
	// 		}
	// 		// const connection = await App.startGame(deposit)
	// 		let connection = ""
	// 		try {
	// 			await window.game.start()
	// 			await window.game.connect({
	// 				playerDeposit: deposit,
	// 				gameData: [0, 0]
	// 			})
	// 		} catch (e) {
	// 			this.setSpinnerStatus("none")
	// 			this.log.innerHTML += `<p><b>ERROR</b>: ${"Can't connect, please repeat..."}</p>`
	// 			btn.disabled = false
	// 			console.error(e)
	// 			console.warn("Can't connect, please repeat...")
	// 			return
	// 		}
	// 		this.setSpinnerStatus("none")
	// 		connection = "success"
	// 		console.info("Connect result: success")
	// 		this.showStep4(connection)
	// 	}
	// }

	async playRound() {
		document.getElementById("wrapper").innerHTML = '<input id="secondroll" name="roll" type="checkbox" style="display: none;"> <input id="roll" name="roll" type="checkbox" style="display: none;"> <label for="roll" style="display: none;">Shuffle!</label> <label for="secondroll" id="stop_roll" style="display: none;"><span>Stop!</span></label> <div id="platform"><div id="dice"> <div class="side front"> <div class="dot center"></div> </div> <div class="side front inner"></div> <div class="side top"> <div class="dot dtop dleft"></div> <div class="dot dbottom dright"></div> </div> <div class="side top inner"></div> <div class="side right"> <div class="dot dtop dleft"></div> <div class="dot center"></div> <div class="dot dbottom dright"></div> </div> <div class="side right inner"></div> <div class="side left"> <div class="dot dtop dleft"></div> <div class="dot dtop dright"></div> <div class="dot dbottom dleft"></div> <div class="dot dbottom dright"></div> </div> <div class="side left inner"></div> <div class="side bottom"> <div class="dot center"></div> <div class="dot dtop dleft"></div> <div class="dot dtop dright"></div> <div class="dot dbottom dleft"></div> <div class="dot dbottom dright"></div> </div> <div class="side bottom inner"></div> <div class="side back"> <div class="dot dtop dleft"></div> <div class="dot dtop dright"></div> <div class="dot dbottom dleft"></div> <div class="dot dbottom dright"></div> <div class="dot center dleft"></div> <div class="dot center dright"></div> </div> <div class="side back inner"></div> <div class="side cover x"></div> <div class="side cover y"></div> <div class="side cover z"></div> </div></div>';

		document.getElementById("roll").click();
		document.getElementById("play").innerHTML = 'Stop';
		// document.getElementById("play").setAttribute('onclick', 'stopRoll(' + 5 + ')');
		document.getElementById("play").setAttribute('id', 'stop');

		document.getElementById("stop").onclick = async () => await this.stopRound()
	}

	// showStep4(connection) {
	// 	this.showStep(4)

	// 	// const table = document.querySelector('.step-4 table.play-log tbody')
	// 	let playCnt = 0

	// 	const endBtn = this.root.querySelector(".step-4 button.next")
	// 	endBtn.disabled = true
	// 	endBtn.onclick = async () => {
	// 		this.showStep5()
	// 		this.disconnect()
	// 	}

	// 	const btn = this.root.querySelector(".step-4 button.play")
	// 	btn.onclick = async () => {
	// 		document.getElementById("loader-spinner").innerHTML = '<div id="background"></div> <div id="wrapper"> <input id="secondroll" name="roll" type="checkbox"> <input id="roll" name="roll" type="checkbox"> <label for="roll">Shuffle!</label> <label for="secondroll" id="stop_roll"><span>Stop!</span></label> <div id="platform"> <div id="dice"> <div class="side front"> <div class="dot center"></div> </div> <div class="side front inner"></div> <div class="side top"> <div class="dot dtop dleft"></div> <div class="dot dbottom dright"></div> </div> <div class="side top inner"></div> <div class="side right"> <div class="dot dtop dleft"></div> <div class="dot center"></div> <div class="dot dbottom dright"></div> </div> <div class="side right inner"></div> <div class="side left"> <div class="dot dtop dleft"></div> <div class="dot dtop dright"></div> <div class="dot dbottom dleft"></div> <div class="dot dbottom dright"></div> </div> <div class="side left inner"></div> <div class="side bottom"> <div class="dot center"></div> <div class="dot dtop dleft"></div> <div class="dot dtop dright"></div> <div class="dot dbottom dleft"></div> <div class="dot dbottom dright"></div> </div> <div class="side bottom inner"></div> <div class="side back"> <div class="dot dtop dleft"></div> <div class="dot dtop dright"></div> <div class="dot dbottom dleft"></div> <div class="dot dbottom dright"></div> <div class="dot center dleft"></div> <div class="dot center dright"></div> </div> <div class="side back inner"></div> <div class="side cover x"></div> <div class="side cover y"></div> <div class="side cover z"></div> </div> </div> </div>'
	// 		this.setSpinnerStatus("block")
	// 		startRoll();

	// 		btn.disabled = true
	// 		btn.innerHTML = "wait..."

	// 		const bet = +document.querySelector('.step-4 input[name="bet"]').value
	// 		const choice = +document.querySelector(
	// 			'.step-4 input[name="choice"]:checked'
	// 		).value
	// 		try {
	// 			const result = await window.game.play({
	// 				userBet: bet,
	// 				gameData: [choice],
	// 				rndOpts: [[1, 6]]
	// 			})
	// 			// this.setSpinnerStatus("none")
	// 			let td1 = document.createElement("td")
	// 			let td2 = document.createElement("td")
	// 			let td3 = document.createElement("td")
	// 			let td4 = document.createElement("td")
	// 			let td5 = document.createElement("td")
	// 			let td6 = document.createElement("td")
	// 			let tr = document.createElement("tr")
	// 			document
	// 				.getElementById("play-table-results")
	// 				.getElementsByTagName("tbody")[0]
	// 				.appendChild(tr)

	// 			td3.innerHTML = 0

	// 			tr.appendChild(td1)
	// 			tr.appendChild(td2)
	// 			tr.appendChild(td3)
	// 			tr.appendChild(td4)
	// 			tr.appendChild(td5)
	// 			tr.appendChild(td6)

	// 			for (let i in result) {
	// 				switch (i) {
	// 					case "balances":
	// 						td6.innerHTML = `player ${result[i].player}
	// 														 bankroller ${result[i].bankroller}`
	// 						break
	// 					case "params":
	// 						td1.innerHTML = result[i].userBet
	// 						td2.innerHTML = result[i].gameData[0]
	// 						break
	// 					case "profit":
	// 						td5.innerHTML = result[i]
	// 						break
	// 					case "randomNums":
	// 						td4.innerHTML = result[i][0]
	// 						break
	// 				}
	// 			}
	// 			// console.log(result)
	// 		} catch (e) {
	// 			// this.setSpinnerStatus("none")
	// 			this.log.innerHTML += `<p><b>ERROR</b>: ${JSON.stringify(e)}</p>`
	// 			console.error(e)
	// 		}
	// 		console.info("Play result:")

	// 		endBtn.disabled = false
	// 		if (playCnt++ > 6) {
	// 			setTimeout(() => {
	// 				this.showStep5()
	// 			}, 3333)
	// 			return
	// 		}
	// 		btn.disabled = false
	// 		btn.innerHTML = "Play"
	// 	}
	// }

	// showStep5() {
	// 	this.showStep(5)
	// 	this.root.querySelector(".step-5 button").onclick = this.disconnect
	// }

	async stopRound() {
		console.log('!!!!!!!!');

		const bet = +document.querySelector('.step-4 input[name="bet"]').value
		const choice = +document.querySelector(
			'.step-4 input[name="choice"]:checked'
		).value
		let hui;
		try {
			const result = await window.game.play({
				userBet: bet,
				gameData: [choice],
				rndOpts: [[1, 6]]
			})
			// this.setSpinnerStatus("none")
			let td1 = document.createElement("td")
			let td2 = document.createElement("td")
			let td3 = document.createElement("td")
			let td4 = document.createElement("td")
			let td5 = document.createElement("td")
			let tr = document.createElement("tr")
			document
				.getElementById("suda-rezu")
				.appendChild(tr)

			tr.appendChild(td1)
			tr.appendChild(td2)
			tr.appendChild(td3)
			tr.appendChild(td4)
			tr.appendChild(td5)
			
			for (let i in result) {
				switch (i) {
					case "balances":
						td5.innerHTML = `${result[i].player}`
						break
					case "params":
						td1.innerHTML = result[i].userBet
						td2.innerHTML = result[i].gameData[0]
						break
					case "profit":
						td4.innerHTML = result[i]
						break
					case "randomNums":
						td3.innerHTML = result[i][0]
						hui = result[i][0]
						break
				}
			}
		}
		catch (ex) {
			console.log('jopa', ex)
		}

		document.getElementById("stop_roll").click();

		if (hui == 1) {
			var text = '<div class="side front"><div class="dot center"></div></div>';
		} else if (hui == 2) {
			var text = '<div class="side front"><div class="dot dtop dleft"></div><div class="dot dbottom dright"></div></div>';
		} else if (hui == 3) {
			var text = '<div class="side front"><div class="dot dtop dleft"></div> <div class="dot center"></div> <div class="dot dbottom dright"></div></div>';
		} else if (hui == 4) {
			var text = '<div class="side front"><div class="dot dtop dleft"></div> <div class="dot dtop dright"></div> <div class="dot dbottom dleft"></div> <div class="dot dbottom dright"></div></div>';
		} else if (hui == 5) {
			var text = '<div class="side front"><div class="dot center"></div> <div class="dot dtop dleft"></div> <div class="dot dtop dright"></div> <div class="dot dbottom dleft"></div> <div class="dot dbottom dright"></div></div>';
		} else if (hui == 6) {
			var text = '<div class="side front"><div class="dot dtop dleft"></div> <div class="dot dtop dright"></div> <div class="dot dbottom dleft"></div> <div class="dot dbottom dright"></div> <div class="dot center dleft"></div> <div class="dot center dright"></div></div>';
		}

		document.getElementById("platform").innerHTML = text;
		document.getElementById("stop").innerHTML = 'Start';
		// document.getElementById("stop").setAttribute('onclick', 'startRoll()');
		document.getElementById("stop").setAttribute('id', 'play');

		document.getElementById("play").onclick = async () => await this.playRound()
	}

	async disconnect() {
		//this.setSpinnerStatus("block")
		const btn = document.querySelector(".step-5 button")
		btn.disabled = true
		this.root.querySelector(".step-5 .close-block").style.display = "none"
		try {
			await window.game.disconnect()
		} catch (e) {
			//this.setSpinnerStatus("none")
			this.log.innerHTML += `<p><b>ERROR</b>: ${"disconnect: error"}</p>`
			console.error(e)
			console.info("Disconnect result:", "error")
		}
		const disconnect = "success"
		this.log.innerHTML += `<p><b>INFO</b>: Disconnect result: success</p>`
		console.info("Disconnect result:", disconnect)
		this.root.querySelector(".step-5 #close_result").innerHTML = JSON.stringify(
			disconnect
		)

		this.root.querySelector(".step-5 .outro-block").style.display = "block"
	}
}()