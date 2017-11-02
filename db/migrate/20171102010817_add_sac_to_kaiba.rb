class AddSacToKaiba < ActiveRecord::Migration[5.1]
  def change
    add_column :kaibas, :selected_sac, :boolean, :default => false
    add_column :yugis, :selected_sac, :boolean, :default => false
  end
end
