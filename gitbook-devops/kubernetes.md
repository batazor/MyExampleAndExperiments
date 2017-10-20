# Kubernetes

---

## Terminology

Throughout this doc you will see a few terms that are sometimes used
interchangeably elsewhere, that might cause confusion.
This section attempts to clarify them.

## Node

Node: A single virtual or physical machine in a Kubernetes cluster.

## Cluster

Cluster: A group of nodes firewalled from the internet, that are the primary compute resources managed by Kubernetes.

## Edge router

Edge router: A router that enforces the firewall policy for your cluster. This could be a gateway managed by a cloudprovider or a physical piece of hardware.

## Cluster network

Cluster network: A set of links, logical or physical, that facilitate communication within a cluster according to the Kubernetes networking model. Examples of a Cluster network include Overlays such as flannel or SDNs such as OVS

## Service

Service: A Kubernetes Service that identifies a set of pods using label selectors. Unless mentioned otherwise, Services are assumed to have virtual IPs only routable within the cluster network.