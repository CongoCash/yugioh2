class AddSpellslotsToGames < ActiveRecord::Migration[5.1]
  def change
    add_column :games, :spell_slots1, :boolean, :array => true, :default => [false, false, false, false, false]
    add_column :games, :spell_slots2, :boolean, :array => true, :default => [false, false, false, false, false]
  end
end
