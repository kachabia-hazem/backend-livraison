import { pgTable, text, integer, serial } from 'drizzle-orm/pg-core';
export const chauffeurs = pgTable('chauffeurs', {
    id: serial('id').primaryKey(),
    nom: text('nom').notNull(),
    prenom: text('prenom').notNull(),
    age: integer('age').notNull(),
    email: text('email').notNull(),
    password: text('password').notNull(),
    status: text('status').notNull(),
    contrat: text('contrat').notNull(),
});
export const fournisseur = pgTable('fournisseur', {
    id: serial('id').primaryKey(),
    nom: text('nom').notNull(),
    adresse: text('adresse').notNull(),
    contact: integer('contact').notNull(),
    serviceOffert: text('serviceOffert').notNull(),
    evaluationGlobale: integer('evaluationGlobale').notNull(),
});
export const vehicule = pgTable('vehicule', {
    id: serial('id').primaryKey(),
    marque: text('marque').notNull(),
    model: text('model').notNull(),
    age: integer('age').notNull(),
    immatriculation: text('immatriculation').notNull(),
    etat: text('etat').notNull(),
    localisation: text('localisation').notNull(),
    kilometrageTotal: integer('kilometrageTotal').notNull(),
    typeDachat: text('typeDachat').notNull(),
    dateDachat: text('dateDachat').notNull(),
    KilometrageVidange: integer('KilometrageVidange').notNull(),
    dateDerniereVidange: text('dateDerniereVidange').notNull(),
    dateProchaineVidange: text('dateProchaineVidange').notNull(),
});
export const reparation = pgTable('reparation', {
    id: serial('id').primaryKey(),
    dateReparation: text('dateReparation').notNull(),
    typeReparation: text('typeReparation').notNull(),
});
export const secteur = pgTable('secteur', {
    id: serial('id').primaryKey(),
    nom: text('nom').notNull(),
    description: text('description').notNull(),
    limiteGraphique: text('limiteGraphique').notNull(),
});
export const trajet = pgTable('trajet', {
    id: serial('id').primaryKey(),
    dateDebut: text('dateDebut').notNull(),
    dateFin: text('dateFin').notNull(),
    distance: integer('distance').notNull(),
});
export const admin = pgTable('admin', {
    id: serial('id').primaryKey(),
    nom: text('nom').notNull(),
    email: text('email').notNull(),
    password: text('password').notNull(),
});
export const entretien = pgTable('entretien', {
    id: serial('id').primaryKey(),
    typeEntretien: text('typeEntretien').notNull(),
    kilometrage: text('kilometrage').notNull(),
    dateEntretien: text('dateEntretien').notNull(),
    commentaire: text('commentaire').notNull(),
});
