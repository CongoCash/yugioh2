class AddSpellplayedToKaibasYugis < ActiveRecord::Migration[5.1]
  def change
    add_column :yugis, :spell_played, :boolean, :default => false
    add_column :kaibas, :spell_played, :boolean, :default => false
  end
end
