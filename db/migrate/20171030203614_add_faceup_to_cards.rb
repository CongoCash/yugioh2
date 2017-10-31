class AddFaceupToCards < ActiveRecord::Migration[5.1]
  def change
    add_column :cards, :faceup, :boolean, :default => false
  end
end
