# ☸ Multi-Container Kubernetes App

## Overview

This project demonstrates the deployment of a multi-container application using Kubernetes on Google Kubernetes Engine (GKE). It includes two separate Node.js applications, each containerized and deployed with its own set of configurations. The project showcases containerization with Docker, orchestration with Kubernetes, continuous integration and deployment with Google Cloud Build, and infrastructure management with Terraform.

### Demo

https://github.com/KaziNizamul/Multi-Container-Kubernetes/assets/19683035/f5c7488b-30df-442e-a96c-2192b3445525



## Components

- **Container 1**: A Node.js application that listens for HTTP requests and performs file storage and calculation operations.
- **Container 2**: Another Node.js application, set up to perform calculations based on CSV file contents and request parameters.
- **Terraform**: Infrastructure as Code (IaC) setup for provisioning GKE clusters to host the containers.
- **Kubernetes (k8s)**: YAML configurations for deploying the applications, including deployments, services, and persistent volume claims (PVCs).

## Key Files and Directories

- `/k8s-repo_container1/container_1` and `/k8s-repo_container2/container_2`: Directories containing Dockerfiles, Node.js application files (`container_1.js`, `container_2.js`), package.json for dependencies, and Kubernetes configurations.
- `cloud-build.yaml` in each container directory: Defines steps for CI/CD using Google Cloud Build to build, push, and deploy Docker images.
- `Dockerfile` in each container directory: Instructions for building Docker images for the Node.js applications.
- `/k8s-repo_container1/terraform` and `/k8s-repo_container2/terraform`: Contains Terraform configurations for provisioning GKE clusters.
- `/k8s-repo_container1/container_1/kubernetes` and `/k8s-repo_container2/container_2/kubernetes`: Kubernetes deployment, PVC, and service configurations.

## Functionality

- **Container 1**:
  - Exposes endpoints for storing files and performing calculations by interacting with Container 2.
  - Utilizes a persistent volume for file storage.
- **Container 2**:
  - Hosts an Express server with an endpoint for performing calculations on data from a CSV file.
  - Shares a persistent volume with Container 1 for file access.

## Deployment Flow

1. **Terraform** scripts are used to provision a GKE cluster.
2. **Docker** images for both Node.js applications are built and pushed to Google Container Registry (GCR) using the `cloud-build.yaml` configurations.
3. **Kubernetes** deployments are created from the images stored in GCR, with services to expose the applications and PVCs for persistent storage.
4. Continuous integration and deployment are managed through Google Cloud Build, automating the build, push, and deployment processes upon code changes.

## Prerequisites

- Google Cloud Platform (GCP) account
- Google Cloud SDK and kubectl installed
- Terraform installed

## Setup and Deployment

1. Configure GCP credentials and set up a GCP project.
2. Run Terraform scripts to create the GKE cluster.
3. Use Cloud Build to automate the deployment or manually build and push Docker images to GCR, then apply Kubernetes configurations to deploy the applications.

## Conclusion

This project illustrates a practical implementation of a multi-container application using modern cloud-native technologies. It demonstrates the power of Kubernetes for managing containerized applications, the convenience of Terraform for infrastructure provisioning, and the efficiency of CI/CD pipelines for automated deployments.
