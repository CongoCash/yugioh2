class AddColumnsToKaiba < ActiveRecord::Migration[5.1]
  def change
    add_column :kaibas, :card_name, :string
    add_column :kaibas, :attack, :integer
    add_column :kaibas, :defense, :integer
    add_column :kaibas, :card_type, :string
    add_column :kaibas, :stars, :integer
    add_column :kaibas, :card_attribute, :string
    add_column :kaibas, :description, :string
    add_column :kaibas, :position, :string
    add_column :kaibas, :selected, :boolean, :default => false
    add_column :kaibas, :has_attacked, :boolean, :default => false
    add_column :kaibas, :has_changed_battle_position, :boolean, :default => false
    add_column :kaibas, :faceup, :boolean, :default => false
    add_column :kaibas, :image_url, :string
  end
end
