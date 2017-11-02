class AddSacToCards < ActiveRecord::Migration[5.1]
  def change
    add_column :cards, :selected_sax, :boolean, :default => false
  end
end
