// Stage-specific inject card content for the Dinosaur Race
// Each stage (except start) has a unique challenge

export const STAGE_INJECTS = {
  // Stage 0: Wakanga's Villa - Starting Line (no inject)
  0: null,

  // Stage 1: Goldenthrone - No inject for first racing stage
  1: null,

  // Stage 2: Temple of Savras
  2: {
    cardType: 'event',
    title: 'Temple of Savras',
    challenge: 'Charisma (Performance) DC 15',
    successText: 'On success: Bonus +15 feet of movement this turn.',
    description: 'The faithful of the All-Seeing surge to their feet, chanting your name! Play to the crowd for divine favor.',
  },

  // Stage 3: Temple of Gond
  3: {
    cardType: 'event',
    title: 'Temple of Gond',
    challenge: 'Intelligence (Religion) DC 10',
    successText: 'On success: Receive a boon from the priests.',
    description: 'The inventors of Port Nyanzaru offer their blessing to those who honor their craft.',
  },

  // Stage 4: Jewel Market
  4: {
    cardType: 'hazard',
    title: 'Jewel Market',
    challenge: "Player's Choice: Strength OR Dexterity DC 15",
    successText: 'On success: Navigate the water jets unscathed.',
    description: 'Magical water jets spray across the track! Brace yourself or dodge between the streams.',
  },

  // Stage 5: Executioner's Run
  5: {
    cardType: 'hazard',
    title: "Executioner's Run",
    challenge: 'Dexterity Saving Throw DC 15',
    successText: 'On failure: Take damage from falling debris.',
    description: 'Rickety scaffolding groans overhead! Debris rains down on the racers below.',
  },

  // Stage 6: Grand Souk
  6: {
    cardType: 'event',
    title: 'Grand Souk',
    challenge: "Player's Choice: Accept disadvantage on next roll OR attempt DC 20 leap",
    successText: 'Leap success: Clear the obstacle spectacularly!',
    description: 'A merchant cart blocks the path! Take the safe route around, or leap over for glory!',
  },

  // Stage 7: Grand Coliseum
  7: {
    cardType: 'event',
    title: 'Grand Coliseum',
    challenge: 'Charisma (Performance) DC 15 (or DC 20 for greater reward)',
    successText: 'DC 15: +15 feet | DC 20: +30 feet of movement.',
    description: 'The roar of the crowd reaches a fever pitch! This is your moment to shine!',
  },
};

export const getStageInject = (stageId) => STAGE_INJECTS[stageId] || null;

export const hasInject = (stageId) => STAGE_INJECTS[stageId] !== null;
