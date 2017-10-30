class AddHasattackedToCards < ActiveRecord::Migration[5.1]
  def change
    add_column :cards, :has_attacked, :boolean, :default => false
  end
end
