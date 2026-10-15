import type { AuthorAssociation, Reactions, User } from "./issue";

export interface Comment {
  url:                      string;
  html_url:                 string;
  issue_url:                string;
  id:                       number;
  node_id:                  string;
  user:                     User;
  created_at:               string;
  updated_at:               string;
  body:                     string;
  author_association:       AuthorAssociation;
  reactions:                Reactions;
  performed_via_github_app: null;
  
}