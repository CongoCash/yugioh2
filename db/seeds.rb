Card.destroy_all

Card.create(
  {
    card_name: "Dark Magician",
    attack: 2500,
    defense: 2000,
    type: "dark",
    stars: 6,
    attribute: "monster",
    description: "yugi's dark magician"
  })

Card.create(
  {
    card_name: "Dark Magician Girl",
    attack: 2000,
    defense: 1500,
    type: "dark",
    stars: 5,
    attribute: "monster",
    description: "yugi's dark magician girl"
  })