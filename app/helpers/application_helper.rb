module ApplicationHelper
  def site(rest_of_path)
  	"http://"+request.host_with_port+rest_of_path
  end
end
