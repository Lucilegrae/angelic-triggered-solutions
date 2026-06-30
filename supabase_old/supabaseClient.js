// supabaseClient.js
// Angelic Triggered Solutions portal integration

import { createClient } from '@supabase/supabase-js';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

// Supabase project reference and anon key
const supabaseUrl = 'https://wtifrlhiyzudgppqswzw.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_eLu_k-kp9xTcQcM0hTRIwg_trevTugn';

// Create Supabase client (for auth, storage, realtime, etc.)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Apollo Client (for GraphQL queries/mutations)
const client = new ApolloClient({
  uri: `${supabaseUrl}/graphql/v1`,
  headers: {
    apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
  },
  cache: new InMemoryCache(),
});

// Orientation Hall: Create Stakeholder
export async function createStakeholder(name, email, role) {
  const mutation = gql`
    mutation {
      insertStakeholders(objects: {
        name: "${name}",
        email: "${email}",
        role: "${role}"
      }) {
        id
        name
        email
      }
    }
  `;
  const result = await client.mutate({ mutation });
  return result.data.insertStakeholders;
}

// Commitment Chamber: Update Progress Stage
export async function updateProgress(stakeholderId, stage) {
  const mutation = gql`
    mutation {
      updateStakeholders(
        where: { id: { _eq: "${stakeholderId}" } },
        _set: { progress_stage: ${stage} }
      ) {
        id
        progress_stage
      }
    }
  `;
  const result = await client.mutate({ mutation });
  return result.data.updateStakeholders;
}

// Empowerment Arena: Add Blessing
export async function addBlessing(stakeholderId, branch, phrase, progressPercent) {
  const mutation = gql`
    mutation {
      insertBlessings(objects: {
        stakeholder_id: "${stakeholderId}",
        branch: "${branch}",
        phrase: "${phrase}",
        progress_percent: ${progressPercent}
      }) {
        id
        phrase
        branch
      }
    }
  `;
  const result = await client.mutate({ mutation });
  return result.data.insertBlessings;
}

// Legacy Archive: Submit Reflection
export async function submitReflection(stakeholderId, reflectionText) {
  const mutation = gql`
    mutation {
      insertFeedback(objects: {
        stakeholder_id: "${stakeholderId}",
        reflection_text: "${reflectionText}"
      }) {
        id
        reflection_text
        certificate_url
      }
    }
  `;
  const result = await client.mutate({ mutation });
  return result.data.insertFeedback;
}

export default client;
