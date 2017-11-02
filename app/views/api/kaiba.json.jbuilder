# json.array! @cards, partial: 'api/card', as: :card

json.array! @kaibas, :id, :card_name, :attack, :defense, :description,
            :selected, :position, :has_attacked, :faceup, :has_changed_battle_position,
            :image_url, :stars, :selected_sac, :card_type, :facedown_spell, :facedown_def