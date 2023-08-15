resource "vercel_project" "vercel_api" {
  name = "sugaming-api"

  git_repository = {
    type              = "github"
    repo              = "fss-fmi/sugaming"
    production_branch = "release-placeholder"
  }

  build_command    = "yarn nx build sugaming-api --prod"
  output_directory = "../../dist/apps/sugaming-api"
  install_command  = "cd ../.. && yarn install --production"
  root_directory   = "apps/sugaming-api"
}
