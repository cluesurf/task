#!/usr/bin/env bash
# Download / upload protocol coverage — checks every subcommand
# is wired and accepts the protocol-specific flags. Doesn't hit
# the network.
cd "$(dirname "$0")/../.." || exit 1
. test/lib.sh

suite "Download"

step "lists every protocol"
for p in hugging-face s3 gcs azure ftp sftp webdav ipfs torrent; do
  expect_contains "download $p" "task download --help" "^  $p"
done

step "s3 endpoint flag (R2)"
expect_contains "endpoint" "task download s3 --help" "endpoint"

step "azure account flag"
expect_contains "account" "task download azure --help" "account"

step "torrent seed-time flag"
expect_contains "seed-time" "task download torrent --help" "seed-time"

summary

suite "Upload"

step "lists every protocol"
for p in s3 gcs azure ftp sftp webdav ipfs; do
  expect_contains "upload $p" "task upload --help" "^  $p"
done

step "ipfs cid-version flag"
expect_contains "cid-version" "task upload ipfs --help" "cid-version"

summary
