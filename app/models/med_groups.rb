# == Schema Information
#
# Table name: med_groups
#
#  id         :integer         not null, primary key
#  name       :string(255)     default: random
#  followers  :integer         default:0
#  created_at :datetime        not null
#  updated_at :datetime        not null
#
class MedGroups < ActiveRecord::Base
  attr_accessible :name, :followers
  VALID_NAME = /\A[\w]+\Z/
  validates :name, presence: true, format:{with:VALID_NAME},length: {minimum: 3, maximum: 30}
end
