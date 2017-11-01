class AddColumnsToYugi < ActiveRecord::Migration[5.1]
  def change
    add_column :yugis, :card_name, :string
    add_column :yugis, :attack, :integer
    add_column :yugis, :defense, :integer
    add_column :yugis, :card_type, :string
    add_column :yugis, :stars, :integer
    add_column :yugis, :card_attribute, :string
    add_column :yugis, :description, :string
    add_column :yugis, :position, :string
    add_column :yugis, :selected, :boolean, :default => false
    add_column :yugis, :has_attacked, :boolean, :default => false
    add_column :yugis, :has_changed_battle_position, :boolean, :default => false
    add_column :yugis, :faceup, :boolean, :default => false
    add_column :yugis, :image_url, :string

  end
end
