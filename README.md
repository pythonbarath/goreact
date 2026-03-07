# Go + React Portfolio

Simple portfolio app:
- Go (`net/http`) serves the site on port `8080`
- React renders the UI in the browser

## Local run

```powershell
go run .
```

Open `http://localhost:8080`.

## Docker run

```bash
docker build -t go-react-app .
docker run --rm -p 8080:8080 go-react-app
```

## EC2 + Nginx + GitHub Actions deployment

This repo includes:
- `Dockerfile`: multi-stage Go image build
- `docker-compose.yml`: runs `app` + `nginx`
- `nginx/nginx.conf`: reverse proxy `nginx -> app:8080`
- `.github/workflows/deploy.yml`: build to ECR and deploy to EC2 on push to `main`

### 1) Prepare EC2 once

Install Docker, Docker Compose plugin, and AWS CLI on your EC2 instance.

Create deploy folder:

```bash
sudo mkdir -p /opt/go-react-app
sudo chown -R $USER:$USER /opt/go-react-app
```

Make sure EC2 security group allows:
- `80` from internet
- `22` only from your trusted IP

### 2) Create ECR repository

Example:

```bash
aws ecr create-repository --repository-name go-react-app --region ap-south-1
```

### 3) Add GitHub repository secrets

Set these in `Settings -> Secrets and variables -> Actions`:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION` (example: `ap-south-1`)
- `ECR_REPOSITORY` (example: `go-react-app`)
- `EC2_HOST` (public IP or DNS)
- `EC2_USER` (example: `ubuntu`)
- `EC2_SSH_PRIVATE_KEY` (private key content used by GitHub Actions to SSH)
- `EC2_DEPLOY_PATH` (example: `/opt/go-react-app`)

### 4) IAM permissions needed

The IAM user for GitHub Actions should allow:
- ECR login and image push (`ecr:*` for auth + push actions)

EC2 instance role (or EC2 user credentials) should allow:
- ECR pull (`ecr:GetAuthorizationToken`, `ecr:BatchGetImage`, `ecr:GetDownloadUrlForLayer`)

### 5) Deploy

Push to `main`. Workflow will:
1. Build Docker image
2. Push image to ECR tagged with commit SHA
3. Copy `docker-compose.yml` and Nginx config to EC2
4. Write `.env` with `APP_IMAGE=<new_ecr_image>`
5. Run `docker compose up -d --remove-orphans`

After deployment, open your EC2 public URL on port `80`.
