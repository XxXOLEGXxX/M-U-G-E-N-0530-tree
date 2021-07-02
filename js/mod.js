let modInfo = {
	name: "The M U G E N#0530 Tree",
	id: "M U G E N",
	author: "you know who",
	pointsName: "points",
	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0000000000000000000000000000000000000000000000000001",
	name: "absolutely everything",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0000000000000000000000000000000000000000000000000001</h3><br>
		- added things<br>
		- added stuff`

let winText = `conglaturations you have reached the end and beaten this game but for now`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if(hasAchievement("a", 11)) gain = gain.mul(new Decimal(1.5).pow(player.a.achievements.length))
	if(hasUpgrade("m", 12)) gain = gain.mul(player.points.add(10).log(10))
	if(hasUpgrade("m", 21)) gain = gain.mul(new Decimal(1.01).pow(player.m.points))
	return gain.mul(layers.t.buyables[11].effect2())
}

function getThingGen() {
	let gain = new Decimal(0)
	if(hasUpgrade("t", 11)) gain = gain.add(5)
	if(hasUpgrade("t", 12)) gain = gain.add(5)
	if(hasUpgrade("t", 13)) gain = gain.add(5)
	if(hasUpgrade("t", 14)) gain = gain.add(10)
	if(hasUpgrade("t", 31) && hasUpgrade("t", 11)) gain = gain.add(5)
	if(hasUpgrade("t", 31) && hasUpgrade("t", 12) && hasUpgrade("t", 53)) gain = gain.add(5)
	if(hasUpgrade("t", 31) && hasUpgrade("t", 13) && hasUpgrade("t", 53)) gain = gain.add(5)
	if(hasUpgrade("t", 31) && hasUpgrade("t", 14) && hasUpgrade("t", 53)) gain = gain.add(5)
	if(hasUpgrade("t", 33) && hasUpgrade("t", 11)) gain = gain.add(5)
	if(hasUpgrade("t", 33) && hasUpgrade("t", 12)) gain = gain.add(5)
	if(hasUpgrade("t", 33) && hasUpgrade("t", 13)) gain = gain.add(5)
	if(hasUpgrade("t", 33) && hasUpgrade("t", 14) && hasUpgrade("t", 53)) gain = gain.add(5)
	if(hasUpgrade("t", 35) && !hasUpgrade("t", 53)) gain = gain.mul(2)
	if(hasUpgrade("t", 52)) gain = gain.add(69)
	if(hasUpgrade("t", 31) && hasUpgrade("t", 52) && hasUpgrade("t", 53)) gain = gain.add(5)
	if(hasUpgrade("t", 33) && hasUpgrade("t", 52) && hasUpgrade("t", 53)) gain = gain.add(5)
	if(hasUpgrade("t", 35) && hasUpgrade("t", 53)) gain = gain.mul(2)
	return gain.mul(layers.t.buyables[11].effect())
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}