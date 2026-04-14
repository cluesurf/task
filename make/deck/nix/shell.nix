# Enter a dev shell with every task dep on PATH — no profile mutation,
# teardown on exit.
#
#   nix-shell               # interactive shell
#   nix-shell --run task    # one-off command

{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  name = "cluesurf-task-shell";
  packages = (import ./default.nix { inherit pkgs; }).paths;
}
