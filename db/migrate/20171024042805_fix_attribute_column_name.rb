class FixAttributeColumnName < ActiveRecord::Migration[5.1]
  def change
    rename_column :cards, :attribute, :card_attribute
  end
end
