class AddImagecolumnToCards < ActiveRecord::Migration[5.1]
  def change
    add_column :cards, :image_url, :string
  end
end
