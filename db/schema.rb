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

ActiveRecord::Schema.define(version: 20171027043205) do

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
    t.integer "graveyard_user1", default: [], array: true
    t.integer "monster_field_user1", default: [], array: true
    t.integer "spell_field_user1", default: [], array: true
    t.integer "deck_user1", default: [], array: true
    t.integer "current_hand_user1", default: [], array: true
    t.integer "lifepoints_user1", default: [], array: true
    t.integer "turn_counter_user1", default: [], array: true
    t.integer "graveyard_user2", default: [], array: true
    t.integer "monster_field_user2", default: [], array: true
    t.integer "spell_field_user2", default: [], array: true
    t.integer "deck_user2", default: [], array: true
    t.integer "current_hand_user2", default: [], array: true
    t.integer "lifepoints_user2", default: [], array: true
    t.integer "turn_counter_user2", default: [], array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
