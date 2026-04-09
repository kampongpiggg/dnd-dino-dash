// Port Nyanzaru Race Ticker - Default Content
// Categories rotate in order: Latest News -> Advertisements -> Race Information

export const TICKER_CATEGORIES = ['news', 'ads', 'race'];

export const TICKER_CONTENT = {
  news: [
    'ALERT: Undead activity reported near River Tiryki. Farshore explorations delayed.',
    'LATEST: Ghoul attack in Malar\'s Throat REPELLED! Citizens praise heroes calling themselves "the 52nd Expedition" for preventing casualties and evacuating the neighbourhood in the dead of night. No loss of life reported. The Jungle stays back for yet another day!',
    'CRIME: Investigation continues into uncovered Xanathar hideout in abandoned harbour ward sewers. Scene reported as "complete carnage" with seven alleged thieves incinerated and decapitated. Public advised to avoid sewer grates near docks.',
    'DEVELOPING: Merchant Prince Jessamine increases tax on imported herbs; alchemists outraged.',
    'NEWS: Merchant Prince Kwayothe denies rumours of "strange rituals" occurring in her private villa.',
    'WEATHER: Humidity hits all-time highs; priests from Church of Caishenye and the Temple of Savras predict "unprecedented" afternoon downpours.',
    'OFFICIAL: Merchant Prince Kwayothe declares zero tolerance for dangerous new drug known as kublacaine. Consumption, possession, or unauthorised sale of this narcotic is a capital offense. Perpetrators will be sentenced to Executioner\'s Run without appeal. Watch out! See something, say something.',
  ],
  ads: [
    'The Thundering Lizard: Coldest tej in the city! Find us in the Red Bazaar.',
    'Wakanga\'s Wonders: High quality scrolls and potions. Safe for (most) magic users.',
    'Fruit from the Chult: Fresh mangoes and pineapples, picked this morning!',
    'Kaya\'s House of Repose: Why sleep in the dirt? Luxurious beds for weary travellers.',
    'Canoes for Hire: Planning a trip up the Tiryki? See us at the Harbour Ward.',
    'Jewel Market Daily: Rare amethysts and fire opals. Straight from the mines.',
    'Old City Tattoos: Traditional Kroonstadian ink, available now. 50% off tribal patterns!',
    'Temple of Savras: Need a glimpse of the future? Looking for answer to a problem bothering you? Our oracles see all!',
    'Grand Coliseum: Get front-row seats for next week\'s Gladiator vs Raptor duel!',
    'Dye Works: Get your robes colored in the vibrant shades of the Kroonstadian jungle!',
    'Ekene-Afar\'s Weapons & Armour: Entering the pits? Ekene-Afar\'s heavy shields, tridents and magical weapons are Coliseum-tested. Don\'t just fight - win.',
    'EDITORIAL: Who are "The 52nd Expedition"? Heroes, or a new unlicensed paramilitary threat by the Chamber of Lords-Advisory?',
    'Ifan\'s Menagerie: Why walk when you can ride? Ifan Talro\'s stables offer the finest-bred beasts of burden. Poise. Power. Pedigree.',
    'Jobal\'s Guides: Venturing beyond the walls? An unlicensed guide is a death sentence. Book a Jobal-certified explorer today at Goldenthrone and ensure you actually come back!',
    'Damien\'s Leatherworks: Custom leatherwork! Get your own dinosaur saddle. 20% off saddles for allosauruses and triceratops!',
    'Public Bathhouses: Wash away the jungle\'s heat. Enjoy the scented steam and cool pools of the Public Bathhouses. A silver for a dip, a gold for the gods.',
  ],
  race: [
    'REMINDER: The Ytepka Society reminds you: No illegal gambling! Violators would earn a visit into Executioner\'s Run.',
    'Live Odds: Banana Candy (1:2), Big Honker (1:1), Mountain Thunder (1:50), Princess (1:3), Scarback (1:15), Thunderbolt (1:2), Ubtao\'s Favourite (1:4), Zongo (1:6)',
    'BREAKING: SCARBACK WITHDRAWS FROM TODAY\'S RACE! Physicians suspect "mad monkey mist" exposure.',
    'OFFICIAL NOTICE: ALL BETS ON SCARBACK ARE VOIDED. NO REFUNDS WILL BE ISSUED.',
    'Commentary: Ubtao\'s Favourite\'s hot streak has dominated the last three races. Will it continue? Stay tuned!',
    'FAN VOTE: 2 in 3 people surveyed thinks Big Honker will take the lead before the Temple of Gond!',
    'WANTED: Information regarding Xanathar\'s Network hideout in the Harbor Ward. Reward of 2 gold pieces offered by the Ytepka Society.',
  ],
};

export const getCategoryLabel = (category) => {
  switch (category) {
    case 'news': return 'LATEST NEWS';
    case 'ads': return 'ADVERTISEMENT';
    case 'race': return 'RACE INFO';
    default: return '';
  }
};
