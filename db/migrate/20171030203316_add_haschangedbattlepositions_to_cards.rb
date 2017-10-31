class AddHaschangedbattlepositionsToCards < ActiveRecord::Migration[5.1]
  def change
    add_column :cards, :has_changed_battle_position, :boolean, :default => false
  end
end
