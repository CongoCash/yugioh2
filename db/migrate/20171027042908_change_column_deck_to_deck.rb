class ChangeColumnDeckToDeck < ActiveRecord::Migration[5.1]
  def change
    rename_column :decks, :decks_id, :cards_id
  end
end