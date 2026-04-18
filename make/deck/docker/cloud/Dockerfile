# Tier-1 image for cloud / k8s ops actions.
#
# Covers: kubectl, stern (multi-pod log tail), doctl (DigitalOcean),
# wrangler (Cloudflare R2 / Workers). Extend with aws-cli / gcloud /
# flyctl as workloads demand.
# Target size: ≤ 500 MB.
FROM ghcr.io/cluesurf/task-base:latest

ENV DEBIAN_FRONTEND=noninteractive

RUN curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.31/deb/Release.key \
      | gpg --dearmor -o /usr/share/keyrings/kubernetes-apt-keyring.gpg \
  && echo "deb [signed-by=/usr/share/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.31/deb/ /" \
      | tee /etc/apt/sources.list.d/kubernetes.list \
  && apt-get update -y -q \
  && apt-get install -y --no-install-recommends kubectl \
  && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://github.com/stern/stern/releases/download/v1.30.0/stern_1.30.0_linux_amd64.tar.gz \
      | tar -xz -C /usr/local/bin stern

RUN curl -fsSL https://github.com/digitalocean/doctl/releases/download/v1.115.0/doctl-1.115.0-linux-amd64.tar.gz \
      | tar -xz -C /usr/local/bin doctl

# wrangler ships as an npm package.
RUN npm install -g wrangler

LABEL org.opencontainers.image.title="Task Cloud"
LABEL org.opencontainers.image.description="Cloud / k8s tooling for @cluesurf/task."
