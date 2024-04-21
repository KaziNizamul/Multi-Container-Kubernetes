
terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
      version = "5.21.0"
    }
  }
}

provider "google" {
  credentials = file("./application-default.json")
  project     = "kuber-project-418102"
  region      = "us-central1-a"
}

resource "google_container_cluster" "cluster" {
  name               = "kuber-project-418102-cluster"
  location           = "us-central1-a"
  initial_node_count = 1

  node_config {
    machine_type = "e2-micro"
    disk_type    = "pd-standard"
    disk_size_gb = 10
    image_type   = "COS_CONTAINERD"
  }
}

output "cluster_endpoint" {
  value = google_container_cluster.cluster.endpoint
}
