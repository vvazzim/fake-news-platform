# Fake News Platform

## Description

Ce projet est une plateforme d’analyse de fact distribuée basée sur une architecture microservices. Elle permet d’analyser, fusionner et visualiser la véracité de faits sous forme de texte, tout en assurant une scalabilité et une gestion modulaire.

Le projet utilise Docker pour la containerisation et Kubernetes (via Minikube) pour l’orchestration. Le tout est routé via une passerelle API (`api-gateway`) et exposé par un service frontend via Ingress.

---

## Prérequis

- [Docker](https://docs.docker.com/get-docker/)
- [Minikube](https://minikube.sigs.k8s.io/docs/start/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)

> On suppose que Minikube utilise le **driver Docker** :
>
> ```bash
> minikube config set driver docker
> ```

---

## Setup Instructions

### 1. Démarrer Minikube

```bash
minikube start --driver=docker
```

### 2. Cloner le dépôt

```bash
git clone https://github.com/vvazzim/fake-news-platform.git
cd fake-news-platform
```

### 3. Construction des images Docker

Depuis la racine du projet, build chaque microservice (ou uniquement ceux modifiés) :

```bash
docker build -t douns/api-gateway:latest microservices/api-gateway
docker build -t douns/text-analyzer:latest microservices/text-analyzer
docker build -t douns/fusion-analyzer:latest microservices/fusion-analyzer
docker build -t douns/frontend:latest microservices/frontend
```

### 4. Activer Ingress NGINX

```bash
minikube addons enable ingress
```

### 5. Déployer les microservices sur Kubernetes

```bash
kubectl apply -f kubernetes/
```

### 6. Suivre le statut des pods

```bash
kubectl get pods --watch
```

---

## Accéder à l’application

### Vérifier l’adresse Ingress

```bash
kubectl get ingress
```

---

## Sécurisation Kubernetes (RBAC)

Un mécanisme RBAC a été mis en place pour le service `api-gateway`, afin de limiter ses permissions au strict nécessaire :

- Création d’un compte de service : `api-gateway-sa`
- Définition d’un `Role` nommé `api-gateway-role`, autorisant uniquement la lecture des pods (`get`, `list`, `watch`) dans le namespace `default`.
- Association via un `RoleBinding` nommé `api-gateway-binding`.

Ce système permet d’appliquer le principe du moindre privilège à l’API Gateway.

- En cas d’accès requis à des ressources inter-namespaces (comme `services` ou `nodes`), un `ClusterRole` nommé `api-gateway-cluster-role` a été défini.
- Ce rôle est associé au compte de service `api-gateway-sa` via un `ClusterRoleBinding` nommé `api-gateway-cluster-binding`.

Cela permet à `api-gateway` d’interagir avec des ressources globales du cluster, tout en respectant le principe du moindre privilège.

Pour tester les droits du service, on peut utiliser la commande suivante :

```bash
kubectl auth can-i list pods --as=system:serviceaccount:default:api-gateway-sa

```

## Architecture des dossiers

├── database<br>
├── microservices/dashboard<br>
├── microservices/<br>
│ ├── api-gateway/<br>
│ ├── text-analyzer/<br>
│ ├── fusion-analyzer/<br>
├── kubernetes/<br>
│ └── \*.yaml<br>
└── README.md

```

---

## Informations supplémentaires

- Le système repose sur une architecture microservices simple avec communication HTTP.
- Les images Docker sont locales et utilisées directement par Minikube.
- Les routes sont gérées via un Ingress NGINX.
- `api-gateway` peut dépendre d’un Kafka externe (à brancher dans une version future si besoin).
- Tous les services sont déployés dans le namespace par défaut (par simplicité).

---
```
