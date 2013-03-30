module UsersHelper
  
  def calculateRank(user)
    rank=""
    #first part of rank algorithm
    case user.microposts.count
    when 0..10
      #nothing
    when 11..50
     rank+="active "
    when 50..Infinity
      rank+="hyper active "
    else
      #nothing
    end
    #second part of rank algorithm
    case user.meds
    when 0..50
      rank+="small fry"
    when 50..350
     rank+="popular"
    when 350..Infinity
      rank+="popular"
    else
      #nothing
    end
    rank
  end
  def calculate_meddals(user)
    meddals={}
    num1=0
    num2=0
    user.comments.each{|comment|
      if comment.commentable_type="micropost"
        micropost=Micropost.find(comment.commentable_id)
      if micropost.top_comment?(comment)
        num1+=1
        meddals[:topcomment]= num1
      end
      if micropost.top_comment?(comment)
        num2+=1
        meddals[:mostreplied]= num2
      end
    end
    }
    meddals
  end
  def user_ready?
   return false if current_user.nil?
    if current_user.meds<10
    user_time_left==0
    else
      true
    end
  end
  def user_time_left
    time=(Time.now-(current_user.comments.order("created_at DESC").first.created_at))
      if time<=60
        time
      else
        0
      end
  end
end
