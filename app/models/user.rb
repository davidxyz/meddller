# == Schema Information
#
# Table name: users
#
#  id         :integer         not null, primary key
#  name       :string(255)
#  email      :string(255)
#  meds       :integer           default:0
#  password_digest :string(255)  not null
#  admin      :boolean          default false
#  image_url  :string           default: anon.png
#  created_at :datetime        not null
#  updated_at :datetime        not null
#   

class User < ActiveRecord::Base
  attr_accessible :email, :name, :password, :password_confirmation, :image_url
  has_many :microposts, dependent: :destroy
  has_many :relationships, foreign_key: "follower_id", dependent: :destroy
  has_many :reverse_relationships, foreign_key: "followed_id", class_name: "Relationship", dependent: :destroy
  has_many :followers, through: :reverse_relationships, source: :follower
  has_many :followed_users, through: :relationships, source: :followed
  has_many :comments, dependent: :destroy
  has_secure_password
  before_save :create_remember_token
  before_save{|user| user.email=email.downcase}
  
  validates :name, presence:true, length: {maximum: 30}
  VALID_EMAIL_REGEX=/\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence:true, format: {with: VALID_EMAIL_REGEX}, uniqueness: {case_sensitive: false}
  validates :password, presence: true, length: {minimum: 6}
  validates :password_confirmation, presence: true
  def feed
    #this is preliminary. See "Following users" for the full implementation
    #Micropost.where("user_id=?", id)
    #will provide an algoithm for suscribed med_groups and suscribed people
    Micropost.select("*")
  end
  def following?(other_user)
    relationships.find_by_followed_id(other_user.id)
  end
  def follow!(other_user)
    relationships.create!(followed_id: other_user.id)
  end
  def unfollow!(other_user)
    relationships.find_by_followed_id(other_user.id).destroy
  end
  private
    def create_remember_token
      self.remember_token = SecureRandom.urlsafe_base64
    end
end
