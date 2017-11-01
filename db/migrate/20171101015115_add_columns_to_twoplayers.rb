class AddColumnsToTwoplayers < ActiveRecord::Migration[5.1]
  def change
    add_column :two_players, :lifepoints1, :integer
    add_column :two_players, :lifepoints2, :integer
    add_column :two_players, :turn, :string
    add_column :two_players, :phase, :integer
    add_column :two_players, :phase_name, :string, :array => true
    add_column :two_players, :deck1, :string
    add_column :two_players, :deck2, :string
    add_column :two_players, :hand1, :string
    add_column :two_players, :hand2, :string
    add_column :two_players, :monster_field1, :string, :array => true
    add_column :two_players, :monster_field2, :string, :array => true
    add_column :two_players, :monster_slots1, :boolean, :array => true
    add_column :two_players, :monster_slots2, :boolean, :array => true
    add_column :two_players, :spell_field1, :string, :array => true
    add_column :two_players, :spell_field2, :string, :array => true
    add_column :two_players, :monster_selected, :boolean
    add_column :two_players, :selected_monster, :string
    add_column :two_players, :monster_played, :boolean
    add_column :two_players, :has_drawn, :boolean
    add_column :two_players, :attacker_selected, :boolean
    add_column :two_players, :target_selected, :boolean
    add_column :two_players, :selected_attacker, :string
    add_column :two_players, :selected_target, :string
    add_column :two_players, :selected_has_attacked, :boolean
    add_column :two_players, :first_turn, :boolean
    add_column :two_players, :winner, :string
    add_column :two_players, :selected_card, :string
  end
end
