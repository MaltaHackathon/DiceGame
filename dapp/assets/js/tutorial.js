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
let isStarted = false


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
		
		document.getElementById("step-4").style.display = "none"
		document.getElementById("gamedice").onclick = async () => {
			await this.initDao(playerPrivateKeys['local'])
			await window.game.start()
			await window.game.connect({
				playerDeposit: 10,
				gameData: [0, 0]
			})

			var ws = new WebSocket('ws://localhost:40510');

			ws.onopen = function () {
				console.log('websocket is connected ...')
				ws.send('connected')
			}

			ws.onmessage = (ev) => {
				const res = JSON.parse(ev.data)
				console.log(res)
				if (res.topic === "hermes/intent/kosyachniy:one" && !isStarted) {
					console.log(document.querySelector('.step-4 input[name="choice"]:checked'))
					console.log(document.querySelector('#i1'))
					document.querySelector('.step-4 input[name="choice"]:checked').checked = false

					//var checked = document.querySelector('.step-4 input[name="choice"]:checked').value
					document.querySelector('#i1').checked = true
					//document.getElementById()
				}
				if (res.topic === "hermes/intent/kosyachniy:two" && !isStarted) {
					console.log(document.querySelector('.step-4 input[name="choice"]:checked'))
					console.log(document.querySelector('#i2'))
					document.querySelector('.step-4 input[name="choice"]:checked').checked = false

					//var checked = document.querySelector('.step-4 input[name="choice"]:checked').value
					document.querySelector('#i2').checked = true
					//document.getElementById()
				}
				if (res.topic === "hermes/intent/kosyachniy:three" && !isStarted) {
					console.log(document.querySelector('.step-4 input[name="choice"]:checked'))
					console.log(document.querySelector('#i3'))
					document.querySelector('.step-4 input[name="choice"]:checked').checked = false

					//var checked = document.querySelector('.step-4 input[name="choice"]:checked').value
					document.querySelector('#i3').checked = true
					//document.getElementById()
				}
				if (res.topic === "hermes/intent/kosyachniy:four" && !isStarted) {
					console.log(document.querySelector('.step-4 input[name="choice"]:checked'))
					console.log(document.querySelector('#i4'))
					document.querySelector('.step-4 input[name="choice"]:checked').checked = false

					//var checked = document.querySelector('.step-4 input[name="choice"]:checked').value
					document.querySelector('#i4').checked = true
					//document.getElementById()
				}
				if (res.topic === "hermes/intent/kosyachniy:five" && !isStarted) {
					console.log(document.querySelector('.step-4 input[name="choice"]:checked'))
					console.log(document.querySelector('#i5'))
					document.querySelector('.step-4 input[name="choice"]:checked').checked = false

					//var checked = document.querySelector('.step-4 input[name="choice"]:checked').value
					document.querySelector('#i5').checked = true
					//document.getElementById()
				}
				if (res.topic === "hermes/intent/kosyachniy:six" && !isStarted) {
					console.log(document.querySelector('.step-4 input[name="choice"]:checked'))
					console.log(document.querySelector('#i6'))
					document.querySelector('.step-4 input[name="choice"]:checked').checked = false

					//var checked = document.querySelector('.step-4 input[name="choice"]:checked').value
					document.querySelector('#i6').checked = true
					//document.getElementById()
				}
				if (res.topic === "hermes/intent/kosyachniy:Start" && !isStarted) {
					this.playRound()
				}
				else if (res.topic === "hermes/intent/kosyachniy:Stop" && isStarted) {
					this.stopRound()
				}
			}

			document.getElementById("play").onclick = () => this.playRound()
			this.toggleGameView()
		}
	}

	toggleGameView() {
		var al = document.getElementsByClassName("step-3");
		for (var i=0; i < al.length; i++) {
			console.log(al[i])
			al[i].style.display = "none"
		}
		document.getElementById("step-4").style.display = "block"
	}

	setSpinnerStatus(status) {
		document.getElementById("loader-spinner").style.display = status
	}

	async playRound() {
		isStarted = true;
		document.getElementById("wrapper").innerHTML = '<input id="secondroll" name="roll" type="checkbox" style="display: none;"> <input id="roll" name="roll" type="checkbox" style="display: none;"> <label for="roll" style="display: none;">Shuffle!</label> <label for="secondroll" id="stop_roll" style="display: none;"><span>Stop!</span></label> <div id="platform"><div id="dice"> <div class="side front"> <div class="dot center"></div> </div> <div class="side front inner"></div> <div class="side top"> <div class="dot dtop dleft"></div> <div class="dot dbottom dright"></div> </div> <div class="side top inner"></div> <div class="side right"> <div class="dot dtop dleft"></div> <div class="dot center"></div> <div class="dot dbottom dright"></div> </div> <div class="side right inner"></div> <div class="side left"> <div class="dot dtop dleft"></div> <div class="dot dtop dright"></div> <div class="dot dbottom dleft"></div> <div class="dot dbottom dright"></div> </div> <div class="side left inner"></div> <div class="side bottom"> <div class="dot center"></div> <div class="dot dtop dleft"></div> <div class="dot dtop dright"></div> <div class="dot dbottom dleft"></div> <div class="dot dbottom dright"></div> </div> <div class="side bottom inner"></div> <div class="side back"> <div class="dot dtop dleft"></div> <div class="dot dtop dright"></div> <div class="dot dbottom dleft"></div> <div class="dot dbottom dright"></div> <div class="dot center dleft"></div> <div class="dot center dright"></div> </div> <div class="side back inner"></div> <div class="side cover x"></div> <div class="side cover y"></div> <div class="side cover z"></div> </div></div>'

		document.getElementById("roll").click()
		document.getElementById("play").innerHTML = 'Stop'
		document.getElementById("play").setAttribute('id', 'stop')

		document.getElementById("stop").onclick = async () => await this.stopRound()
	}

	async stopRound() {
		isStarted = false;
		// document.getElementById("newstyle").innerHTML = "#roll:checked ~ #platform > #dice {animation: spin-duplicate 2.7s infinite linear;} #roll:checked ~ #platform {animation: roll 2.1s infinite linear;}"

		const bet = +document.querySelector('.step-4 input[name="bet"]').value
		const choice = +document.querySelector('.step-4 input[name="choice"]:checked').value
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
						td5.innerHTML = result[i].player / 10e17
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
		} catch (ex) {
			console.log('jopa', ex)
		}

		document.getElementById("stop_roll").click()

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

		document.getElementById("platform").innerHTML = text
		document.getElementById("stop").innerHTML = 'Start'
		document.getElementById("stop").setAttribute('id', 'play')

		document.getElementById("play").onclick = async () => await this.playRound()

		// document.getElementById("newstyle").innerHTML = ""
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