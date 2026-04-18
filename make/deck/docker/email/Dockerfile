# Tier-1 image for task email actions.
#
# Pure Node — no native email tool needed. Providers (SendGrid,
# Resend, SES) are HTTP APIs called from the Node runtime in the
# base image. This Dockerfile exists to pin a workload-scoped tag
# so email workers can be deployed independently of other images.
# Target size: ≤ 400 MB (effectively the base image).
FROM ghcr.io/cluesurf/task-base:latest

LABEL org.opencontainers.image.title="Task Email"
LABEL org.opencontainers.image.description="Email send actions for @cluesurf/task."
