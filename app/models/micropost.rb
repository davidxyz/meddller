require 'nokogiri'
require 'open-uri'
require 'uri'

# == Schema Information
#
# Table name: microposts
#
#  id         :integer         not null, primary key
#  title      :string(255)
#  url        :string(255)
#  image_url  :string(255)
#  content    :string(255)
#  user_id    :integer         not null in theory
#  meds       :integer         default:0
#  created_at :datetime        not null
#  updated_at :datetime        not null
#
class Micropost < ActiveRecord::Base
  acts_as_commentable
  has_many :comments
  attr_accessible :content, :title, :urls, :image,:medtype, :remote_image_url,:nsfw
  before_save :create_preview,:lazy_user,:clean_input
  belongs_to :user
  default_scope order:'microposts.created_at DESC'
  validates :nsfw, presence: true
  #3medtypes of microposts medimage, medself, medlink
  mount_uploader :image, ImageUploader
  validates :user_id, presence: true
  validate :ultra_val
  def self.from_users_followed_by(user)
    followed_user_ids = "SELECT followed_id FROM relationships WHERE follower_id = :user_id"
    where("user_id IN (#{followed_user_ids}) OR user_id = :user_id", user_id: user.id)
  end
  def default_feed
    #must improve
    self.all
  end
  def ultra_val
    if medtype=="link_post"
     errors[:base]<<("Uhh, you sure that's a website?")  if urls.nil? or !URI::DEFAULT_PARSER.regexp[:ABS_URI].match(urls) 
    elsif medtype=="self_post"
      errors[:base]<<("Woah say something")  if content.nil? or content.length <4 
      errors[:base]<<("Woah you're saying way too much in your body") if content.length > 1000
    elsif medtype=="image_post"
      errors[:base]<<("Hey, can you upload something already") if image.nil?
    else
      errors[:base]<<("Something, went wrong with your post and we're tearing out our heads trying to find why")
    end
    errors[:base]<<("Your title is very important, please be a bit more expressive") if title.nil? or title.length <4
    errors[:base]<<("Woah your title is way too long") if title.length >140
  end
  private
  
  def create_preview
    if medtype=="link_post"
      doc = Nokogiri::HTML(open(urls))
      max_size=0;
      doc.css('img').each {|image|
        if /\A(http:\/\/).+(gif|png|jpe?g)\z/.match(image['src'])  
          if image['height'].to_i>max_size
            self.preview_url=image['src']
            max_size=image['height'].to_i
          end
        end
      }
    end
  end
  def lazy_user
    unless medtype=="link_post"
      self.urls="/microposts/"+id.to_s
    end
  end
  def clean_input
    unless self.content.nil?
    self.content=wrap(content,35)
    end
  end
end
