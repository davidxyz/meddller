class Relationshipl < ActiveRecord::Base
  attr_accessible :rated_id,:rated_value
  belongs_to :rater, class_name: "User"
  belongs_to :rated, class_name: "Micropost"
  validates :rater_id, presence: true
  validates :rated_id, presence: true
end
