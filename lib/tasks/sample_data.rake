namespace :db do
  desc "Fill database with sample data"
  task populate: :environment do
    40.times do
      content = Faker::Lorem.sentence(5)
      User.first.microposts.create!(content: content)
    end
  end
end