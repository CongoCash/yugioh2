class FixColumnName < ActiveRecord::Migration[5.1]
  def change
    rename_column :cards, :type, :card_type
  end
end
