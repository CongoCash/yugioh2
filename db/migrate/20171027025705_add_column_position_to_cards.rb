class AddColumnPositionToCards < ActiveRecord::Migration[5.1]
  def change
    add_column :cards, :position, :string
  end
end
