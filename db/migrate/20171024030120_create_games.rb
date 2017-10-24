class CreateGames < ActiveRecord::Migration[5.1]
  def change
    create_table :games do |t|
      t.integer :graveyard_user1, array: true, default: []
      t.integer :monster_field_user1, array: true, default: []
      t.integer :spell_field_user1, array: true, default: []
      t.integer :deck_user1, array: true, default: []
      t.integer :current_hand_user1, array: true, default: []
      t.integer :lifepoints_user1, array: true, default: []
      t.integer :turn_counter_user1, array: true, default: []
      t.integer :graveyard_user2, array: true, default: []
      t.integer :monster_field_user2, array: true, default: []
      t.integer :spell_field_user2, array: true, default: []
      t.integer :deck_user2, array: true, default: []
      t.integer :current_hand_user2, array: true, default: []
      t.integer :lifepoints_user2, array: true, default: []
      t.integer :turn_counter_user2, array: true, default: []

      t.timestamps
    end
  end
end
