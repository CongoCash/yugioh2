class AddColumnsToGame < ActiveRecord::Migration[5.1]
  def change
    add_column :games, :lifepoints1, :integer, :default => 8000
    add_column :games, :lifepoints2, :integer, :default => 8000
    add_column :games, :turn, :string, :default => 'player1'
    add_column :games, :phase, :integer, :default => 0
    add_column :games, :phase_name, :string, :array => true, :default => ['Draw', 'Main1', 'Battle', 'Main 2', 'End']
    add_column :games, :deck1, :string, :array => true, :default => []
    add_column :games, :deck2, :string, :array => true, :default => []
    add_column :games, :hand1, :string, :array => true, :default => []
    add_column :games, :hand2, :string, :array => true, :default => []
    add_column :games, :monster_field1, :string, :array => true, :default => []
    add_column :games, :monster_field2, :string, :array => true, :default => []
    add_column :games, :monster_slots1, :boolean, :array => true, :default => [false, false, false, false, false]
    add_column :games, :monster_slots2, :boolean, :array => true, :default => [false, false, false, false, false]
    add_column :games, :spell_field1, :string, :array => true, :default => []
    add_column :games, :spell_field2, :string, :array => true, :default => []
    add_column :games, :monster_selected, :boolean, :default => false
    add_column :games, :selected_monster, :string, :default => ''
    add_column :games, :monster_played, :boolean, :default => false
    add_column :games, :has_drawn, :boolean, :default => false
    add_column :games, :attacker_selected, :boolean, :default => false
    add_column :games, :target_selected, :boolean, :default => false
    add_column :games, :selected_attacker, :string, :default => ''
    add_column :games, :selected_target, :string, :default => ''
    add_column :games, :selected_has_attacked, :boolean, :default => false
    add_column :games, :first_turn, :boolean, :default => true
    add_column :games, :winner, :string, :default => ''
    add_column :games, :selected_card, :string, :default => ''




  end
end
