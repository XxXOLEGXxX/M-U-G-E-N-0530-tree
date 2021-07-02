addLayer("m", {
    name: "motivation", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "m", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires() {let cost = new Decimal(10)
				if(player.m.points.gte(1)) cost = new Decimal(20)
				if(player.m.points.gte(2)) cost = cost.div(4).mul(player.m.points.add(1).pow(2))
				return cost}, // Can be a function that takes requirement increases into account
    resource: "percentage of motivation", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	base: 0,
    exponent: 0, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset for 1% of motivation", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
	tooltip: "here lies my motivation",
	infoboxes: {
		lore: {
			title: "oh god",
			body() { return "oh damn<br><br>idk what to do today, i'm kinda too lazy to make an update for already existing mods...<br><br>perhaps i should actually try to do something in order to get motivation<br><br>hold up, how the hell do you measure motivation anyways?" },
		},
	},
	upgrades: {
		rows: 2,
		cols: 3,
		11: {
			title: "unlock an achievement layer",
			cost: new Decimal(1)
		},
		12: {
			title: "boost point gain based on point gain plus ten and logged by ten cuz why not lol",
			cost: new Decimal(2),
			effect() {return player.points.add(10).log(10)}
		},
		13: {
			title: "abandon motivation layer for a while and unlock totally unrelated layer",
			cost: new Decimal(3),
		},
		21: {
			title: "boosts points gain by one and hundredth times per percentage of motivation",
			cost: new Decimal(7),
			unlocked() {return hasAchievement("a", 13)}
		},
		22: {
			title: "add rebirth feature into tycoon layer",
			cost: new Decimal(8),
			unlocked() {return hasAchievement("a", 13)}
		},
		23: {
			title: "unlock one more totally fun to play layer",
			cost: new Decimal(10),
			unlocked() {return hasAchievement("a", 13)}
		}
	}
})

addLayer("a", {
    name: "achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "a", // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() { return {
        unlocked: true,
    }},
    color: "#4BDC13",
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: "side", // Row the layer is in on the tree (0 is the first row)
	tooltip: "achievements",
    layerShown(){return hasUpgrade("m", 11)},
	infoboxes: {
		lore: {
			title: "oh wow, who could have thought",
			body() { return "here you can complete various achievements or smth, i dunno<br><br>and yes, youll definitely need them in order to progress through the game" },
		},
	},
	achievements: {
		11: {
			name: "new layer???<br><br>multiplies point gain by one and a half times per achievement",
			done() {return hasUpgrade("m", 11)}
		},
		12: {
			name: "but why tho",
			done() {return hasUpgrade("m", 13)}
		},
		13: {
			name: "'lright perhaps well have to grind more.<br><br>unlocks three more motivation upgrades",
			done() {return hasUpgrade("t", 32)}
		},
		14: {
			name: "poggress",
			done() {return player.t.buyables[11].gte(1)}
		},
		15: {
			name: "two down one more left to go",
			done() {return player.m.upgrades.length >= 6}
		},
	}
})

addLayer("t", {
    name: "tycoon", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "t", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		timer: new Decimal(0),
		currentTime: new Decimal(5),
    }},
	update(diff){
		if(player.t.unlocked == true && hasUpgrade("t", 21) && hasUpgrade("t", 22) && hasUpgrade("t", 23) && hasUpgrade("t", 24) && hasUpgrade("t", 25)) player.t.timer = player.t.timer.add(diff)
		if(player.t.timer.gte(player.t.currentTime)) {player.t.timer = new Decimal(0)
								   player.t.points = player.t.points.add(getThingGen())}
	},
	tabFormat: {
		"first floor": {
			content: ["main-display", ["display-text", function() {return hasUpgrade("t", 21) && hasUpgrade("t", 22) && hasUpgrade("t", 23) && hasUpgrade("t", 24) && hasUpgrade("t", 25) ?  "you currently gain "+formatWhole(getThingGen())+" things per "+formatWhole(player.t.currentTime)+" seconds" : "you currently gain 0 things per "+formatWhole(player.t.currentTime)+" seconds"}], "blank", ["upgrades", [1, 2, 3]]]
		},
		"second floor": {
			content: ["main-display", ["display-text", function() {return hasUpgrade("t", 21) && hasUpgrade("t", 22) && hasUpgrade("t", 23) && hasUpgrade("t", 24) && hasUpgrade("t", 25) ?  "you currently gain "+formatWhole(getThingGen())+" things per "+formatWhole(player.t.currentTime)+" seconds" : "you currently gain 0 things per "+formatWhole(player.t.currentTime)+" seconds"}], "blank", ["upgrades", [4, 5, 6]]],
			unlocked() {return hasUpgrade("t", 15)}
		},
		"timewall shrine": {
			content: ["main-display", ["display-text", function() {return hasUpgrade("t", 21) && hasUpgrade("t", 22) && hasUpgrade("t", 23) && hasUpgrade("t", 24) && hasUpgrade("t", 25) ?  "you currently gain "+formatWhole(getThingGen())+" things per "+formatWhole(player.t.currentTime)+" seconds" : "you currently gain 0 things per "+formatWhole(player.t.currentTime)+" seconds"}], "blank", ["display-text", function() {return "you need "+formatWhole(layers.t.buyables[11].cost())+" things to rebirth"}], "blank", "blank", "buyables"],
			unlocked() {return hasUpgrade("m", 22)}
		},
	},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "things", // Name of prestige currency
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset for 1% of motivation", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("m", 13)},
	tooltip: "some generic tycoon from roblocks",
	upgrades: {
		rows: 5,
		cols: 5,
		11: {
			title: "dumb dispenser",
			cost: new Decimal(0),
		},
		12: {
			title() {return hasUpgrade("t", 11) ? "dumber dispenser" : "locked"},
			canAfford() {return player.t.points.gte(this.cost) && hasUpgrade("t", 11)},
			cost: new Decimal(20),
		},
		13: {
			title() {return hasUpgrade("t", 12) ? "even dumber dispenser" : "locked"},
			canAfford() {return player.t.points.gte(this.cost) && hasUpgrade("t", 12)},
			cost: new Decimal(90),
		},
		14: {
			title() {return hasUpgrade("t", 13) ? "slightly better dispenser" : "locked"},
			canAfford() {return player.t.points.gte(this.cost) && hasUpgrade("t", 13)},
			cost: new Decimal(160),
		},
		15: {
			title() {return hasUpgrade("t", 14) ? "stairs to the second floor" : "locked"},
			canAfford() {return player.t.points.gte(this.cost) && hasUpgrade("t", 14)},
			cost: new Decimal(999)
		},
		21: {
			title: "right conveyor belt",
			cost: new Decimal(0),
		},
		22: {
			title: "right conveyor belt",
			cost: new Decimal(0),
		},
		23: {
			title: "right conveyor belt",
			cost: new Decimal(0),
		},
		24: {
			title: "right conveyor belt",
			cost: new Decimal(0),
		},
		25: {
			title: "funni yoinker",
			cost: new Decimal(0),
		},
		31: {
			title() {return hasUpgrade("t", 11) ? "upgrader" : "locked"},
			canAfford() {return player.t.points.gte(this.cost) && hasUpgrade("t", 11)},
			cost: new Decimal(50),
		},
		32: {
			title() {return hasUpgrade("t", 11) ? "faster gain" : "locked"},
			canAfford() {return player.t.points.gte(this.cost) && hasUpgrade("t", 11)},
			cost: new Decimal(400),
			onPurchase() {player.t.currentTime = player.t.currentTime.sub(1)}
		},
		33: {
			title() {return hasUpgrade("t", 11) ? "upgrader" : "locked"},
			canAfford() {return player.t.points.gte(this.cost) && hasUpgrade("t", 11)},
			cost: new Decimal(1650),
		},
		34: {
			title() {return hasUpgrade("t", 11) ? "faster gain" : "locked"},
			canAfford() {return player.t.points.gte(this.cost) && hasUpgrade("t", 11)},
			cost: new Decimal(2700),
			onPurchase() {player.t.currentTime = player.t.currentTime.sub(1)}
		},
		35: {
			title() {return hasUpgrade("t", 11) ? "doubler" : "locked"},
			canAfford() {return player.t.points.gte(this.cost) && hasUpgrade("t", 11)},
			cost: new Decimal(8640),
		},
		41: {
			title: "useless decoration",
			cost: new Decimal(960),
			unlocked() {return hasUpgrade("t", 15)}
		},
		42: {
			title: "useless decoration",
			cost: new Decimal(1056),
			unlocked() {return hasUpgrade("t", 15)}
		},
		43: {
			title: "useless decoration",
			cost: new Decimal(1162),
			unlocked() {return hasUpgrade("t", 15)}
		},
		44: {
			title: "useless decoration",
			cost: new Decimal(1056),
			unlocked() {return hasUpgrade("t", 15)}
		},
		45: {
			title: "useless decoration",
			cost: new Decimal(960),
			unlocked() {return hasUpgrade("t", 15)}
		},
		51: {
			title: "useless decoration",
			cost: new Decimal(2352),
			unlocked() {return hasUpgrade("t", 15)}
		},
		52: {
			title: "le ultimate dispenser",
			cost: new Decimal(300),
			unlocked() {return hasUpgrade("t", 15)}
		},
		53: {
			title() {return hasUpgrade("t", 52) ? "global upgrade updater" : "locked"},
			canAfford() {return player.t.points.gte(this.cost) && hasUpgrade("t", 52)},
			cost: new Decimal(3300),
			unlocked() {return hasUpgrade("t", 15)}
		},
		54: {
			title() {return hasUpgrade("t", 53) ? "engineers dispenser" : "locked"},
			canAfford() {return player.t.points.gte(this.cost) && hasUpgrade("t", 53)},
			cost: new Decimal(999999999),
			unlocked() {return hasUpgrade("t", 15)}
		},
		55: {
			title: "useless decoration",
			cost: new Decimal(2352),
			unlocked() {return hasUpgrade("t", 15)}
		},
		61: {
			title: "useless decoration",
			cost: new Decimal(960),
			unlocked() {return hasUpgrade("t", 15)}
		},
		62: {
			title: "useless decoration",
			cost: new Decimal(1056),
			unlocked() {return hasUpgrade("t", 15)}
		},
		63: {
			title: "useless decoration",
			cost: new Decimal(1162),
			unlocked() {return hasUpgrade("t", 15)}
		},
		64: {
			title: "useless decoration",
			cost: new Decimal(1056),
			unlocked() {return hasUpgrade("t", 15)}
		},
		65: {
			title: "useless decoration",
			cost: new Decimal(960),
			unlocked() {return hasUpgrade("t", 15)}
		},
	},
	buyables: {
		11: {
			cost() {return new Decimal(5760).pow(new Decimal(1).add(player.t.buyables[11].div(10))).round() },
			effect(){return player.t.buyables[11].add(1)},
			effect2(){return player.t.buyables[11].div(2).add(1)},
			display() { return "current multipliers<br><br>"+formatWhole(this.effect())+" times to money gain<br>"+format(this.effect2())+" times to point gain" },
			canAfford() { return player.t.points.gte(this.cost()) },
			buy() {
				player.t.points = new Decimal(0)
				player.t.upgrades = []
				player.t.currentTime = new Decimal(5)
				player.t.buyables[11] = player.t.buyables[11].add(1)
			},
		},
	}
})

addLayer("b", {
    name: "beep", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "b", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    resource: "complete levels", // Name of prestige currency
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	base: 0,
    exponent: 0, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasUpgrade("m", 23)},
	tooltip: "here lies my motivation",
	infoboxes: {
		lore: {
			title: "wait that isnt fnf",
			body() { return "yes you dummy thick boi its actually bootleg rhythm game with one note input<br><br><br>btw this is the current endgame<br>yeah ik this mod sucks ass but im not done with finishing it yet" },
		},
	},
})
