# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171102170927) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cards", force: :cascade do |t|
    t.string "card_name"
    t.integer "attack"
    t.integer "defense"
    t.string "card_type"
    t.integer "stars"
    t.string "card_attribute"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "position"
    t.boolean "selected", default: false
    t.boolean "has_attacked", default: false
    t.boolean "has_changed_battle_position", default: false
    t.boolean "faceup", default: false
    t.string "image_url"
    t.boolean "selected_sax", default: false
  end

  create_table "chat_messages", force: :cascade do |t|
    t.text "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "decks", force: :cascade do |t|
    t.bigint "cards_id"
    t.bigint "users_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["cards_id"], name: "index_decks_on_cards_id"
    t.index ["users_id"], name: "index_decks_on_users_id"
  end

  create_table "games", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "lifepoints1", default: 8000
    t.integer "lifepoints2", default: 8000
    t.string "turn", default: "player1"
    t.integer "phase", default: 0
    t.string "phase_name", default: ["Draw", "Main1", "Battle", "Main 2", "End"], array: true
    t.string "deck1", default: [], array: true
    t.string "deck2", default: [], array: true
    t.string "hand1", default: [], array: true
    t.string "hand2", default: [], array: true
    t.string "monster_field1", default: [], array: true
    t.string "monster_field2", default: [], array: true
    t.boolean "monster_slots1", default: [false, false, false, false, false], array: true
    t.boolean "monster_slots2", default: [false, false, false, false, false], array: true
    t.string "spell_field1", default: [], array: true
    t.string "spell_field2", default: [], array: true
    t.boolean "monster_selected", default: false
    t.string "selected_monster", default: ""
    t.boolean "monster_played", default: false
    t.boolean "has_drawn", default: false
    t.boolean "attacker_selected", default: false
    t.boolean "target_selected", default: false
    t.string "selected_attacker", default: ""
    t.string "selected_target", default: ""
    t.boolean "selected_has_attacked", default: false
    t.boolean "first_turn", default: true
    t.string "winner", default: ""
    t.string "selected_card", default: ""
    t.boolean "spell_slots1", default: [false, false, false, false, false], array: true
    t.boolean "spell_slots2", default: [false, false, false, false, false], array: true
  end

  create_table "kaibas", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "card_name"
    t.integer "attack"
    t.integer "defense"
    t.string "card_type"
    t.integer "stars"
    t.string "card_attribute"
    t.string "description"
    t.string "position"
    t.boolean "selected", default: false
    t.boolean "has_attacked", default: false
    t.boolean "has_changed_battle_position", default: false
    t.boolean "faceup", default: false
    t.string "image_url"
    t.boolean "selected_sac", default: false
    t.string "facedown_spell", default: "https://i.pinimg.com/originals/ed/b7/02/edb702c8400d4b0c806d964380b03b6a.jpg"
    t.string "facedown_def", default: "http://vignette3.wikia.nocookie.net/yugioh/images/6/68/Face_Down_Defense_Position.png/revision/latest?cb=20100726091546"
    t.boolean "spell_played", default: false
  end

  create_table "two_players", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "lifepoints1"
    t.integer "lifepoints2"
    t.string "turn"
    t.integer "phase"
    t.string "phase_name", array: true
    t.string "deck1"
    t.string "deck2"
    t.string "hand1"
    t.string "hand2"
    t.string "monster_field1", array: true
    t.string "monster_field2", array: true
    t.boolean "monster_slots1", array: true
    t.boolean "monster_slots2", array: true
    t.string "spell_field1", array: true
    t.string "spell_field2", array: true
    t.boolean "monster_selected"
    t.string "selected_monster"
    t.boolean "monster_played"
    t.boolean "has_drawn"
    t.boolean "attacker_selected"
    t.boolean "target_selected"
    t.string "selected_attacker"
    t.string "selected_target"
    t.boolean "selected_has_attacked"
    t.boolean "first_turn"
    t.string "winner"
    t.string "selected_card"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "yugis", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "card_name"
    t.integer "attack"
    t.integer "defense"
    t.string "card_type"
    t.integer "stars"
    t.string "card_attribute"
    t.string "description"
    t.string "position"
    t.boolean "selected", default: false
    t.boolean "has_attacked", default: false
    t.boolean "has_changed_battle_position", default: false
    t.boolean "faceup", default: false
    t.string "image_url"
    t.boolean "selected_sac", default: false
    t.string "facedown_spell", default: "https://i.pinimg.com/originals/ed/b7/02/edb702c8400d4b0c806d964380b03b6a.jpg"
    t.string "facedown_def", default: "http://vignette3.wikia.nocookie.net/yugioh/images/6/68/Face_Down_Defense_Position.png/revision/latest?cb=20100726091546"
    t.boolean "spell_played", default: false
  end

end
